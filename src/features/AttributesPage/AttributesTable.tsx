import { ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { useCallback, useContext, useMemo, useRef } from "react";

import { AppContext } from "../../context/AppContext";
import { dummyPlayer } from "../../helpers/player";
import {
  calculateFMRoleScore,
  calculateTotalRoleAttributeScore,
} from "../../helpers/roles";
import { Attributes, Data, Player } from "../../types/player";
import { Role } from "../../types/role";
import { filterInvalidRows, filterZeroRows, filterZeros } from "./helpers";

type ColumnType = "name" & keyof Attributes;
export type RowDataType =
  | ({
      name: string;
      total: number;
    } & Attributes)
  | undefined;
const calcTotalAttributes = (attributes: Attributes | undefined) => {
  if (!attributes) {
    return 0;
  }
  return Object.values(attributes).reduce((a, b) => {
    return a + b;
  });
};

export const AttributesTable = ({
  hideEmptyColumns,
  primaryDataSet,
  roleFilter,
  secondaryDataSet,
  showChangesOnly,
}: {
  hideEmptyColumns: boolean;
  primaryDataSet: Data | undefined;
  roleFilter?: Role;
  secondaryDataSet: Data | undefined;
  showChangesOnly: boolean;
}) => {
  const gridRef = useRef<AgGridReact>(null);
  const attributes = primaryDataSet?.players[0].attributes;
  const { settings } = useContext(AppContext);
  const returnAttributes = (playerInPrimaryDataSet: Player) => {
    const returnPlayerAttributes = () => {
      if (!secondaryDataSet) {
        return playerInPrimaryDataSet.attributes;
      }
      const playerInSecondaryDataSet = secondaryDataSet.players.find(
        (secondPlayer) => playerInPrimaryDataSet.name === secondPlayer.name
      );
      if (playerInSecondaryDataSet) {
        const deltaObject = Object.keys(playerInPrimaryDataSet.attributes).map(
          (key) => {
            const thisKey = key as keyof Attributes;
            const p1 = playerInPrimaryDataSet.attributes[thisKey];
            const s1 = playerInSecondaryDataSet.attributes[thisKey] || NaN;
            return [key, p1 - s1];
          }
        );
        return Object.fromEntries(deltaObject);
      }
      // if we don't find the player in the compare set we return NaNs to be able to
      // filter easier afterwards
      return Object.fromEntries(
        Object.keys(dummyPlayer.attributes).map((key) => [key, NaN])
      );
    };

    const attributes = returnPlayerAttributes();
    const roleValues =
      roleFilter &&
      calculateFMRoleScore(playerInPrimaryDataSet, roleFilter, settings);
    return {
      fmp: roleValues?.primaryScore,
      fms: roleValues?.secondaryScore,
      fmt: roleValues?.totalScore,
      total: calcTotalAttributes(attributes),
      role: roleFilter?.physis
        ? calculateTotalRoleAttributeScore(attributes, roleFilter)
        : NaN,
      ...attributes,
    };
  };

  const rowData: RowDataType[] | undefined = primaryDataSet?.players
    .map((player) => ({
      name: player.name,
      ...returnAttributes(player),
    }))
    .filter(filterInvalidRows)
    .filter(filterZeroRows(showChangesOnly));

  const colDefs = useMemo(() => {
    const attributeFields = attributes
      ? Object.keys(attributes)
          .map((att) => {
            return {
              field: att as ColumnType,
              maxWidth: 76,
              headerName: att.substring(0, 4),
            };
          })
          .filter(filterZeros(hideEmptyColumns, rowData))
          .filter((item) => {
            if (!item.field) {
              return false;
            }
            if (!roleFilter) {
              return true;
            }
            const requiredRoleKeys = [
              ...(roleFilter?.primary || []),
              ...(roleFilter?.secondary || []),
            ];
            if (requiredRoleKeys.includes(item.field)) {
              return true;
            }
            return false;
          })
      : [];

    return [
      {
        field: "name" as ColumnType,
        flex: 1,
        sortable: true,
        filter: true,
        floatingFilter: false,
      },
      ...(showChangesOnly
        ? [
            {
              field: "total" as ColumnType,
              flex: 1,
              sortable: true,
              filter: true,
              floatingFilter: false,
            },
          ]
        : []),
      ...(roleFilter
        ? [
            {
              cellRenderer: ({ value }: ICellRendererParams) =>
                value.toFixed(settings.decimals),
              field: "fmp" as ColumnType,
              filter: true,
              flex: 1,
              floatingFilter: false,
              headerTooltip:
                "Average of the primary attributes for selected role",
              sortable: true,
              title: "FMP",
              tooltipValueGetter: () =>
                "Create any fixed message, e.g. This is the Athlete’s Age ",
            },
            {
              cellRenderer: ({ value }: ICellRendererParams) =>
                value.toFixed(settings.decimals),
              field: "fms" as ColumnType,
              filter: true,
              flex: 1,
              floatingFilter: false,
              headerTooltip:
                "Average of the secondary attributes for selected role",
              sortable: true,
              title: "FMS",
              tooltipValueGetter: () =>
                "Create any fixed message, e.g. This is the Athlete’s Age ",
            },
            {
              cellRenderer: ({ value }: ICellRendererParams) =>
                value.toFixed(settings.decimals),
              field: "fmt" as ColumnType,
              filter: true,
              flex: 1,
              floatingFilter: false,
              headerTooltip:
                "Weighted average of the primary and secondary attributes for selected role",
              sortable: true,
              title: "FMT",
              tooltipValueGetter: () =>
                "Create any fixed message, e.g. This is the Athlete’s Age ",
            },
          ]
        : []),
      ...attributeFields,
    ];
  }, [attributes, hideEmptyColumns, rowData, roleFilter, showChangesOnly]);

  const fitAllColumns = useCallback(() => {
    gridRef?.current?.api.autoSizeAllColumns();
  }, []);

  const onFirstDataRendered = useCallback(() => {
    fitAllColumns();
  }, [fitAllColumns]);

  return (
    <div className="w-full h-[calc(100vh-300px)] overflow-visible border-b-[2px] border-gray-900 pb-1 ag-theme-alpine">
      <AgGridReact
        animateRows={true}
        columnDefs={colDefs}
        defaultColDef={{
          sortable: true,
          filter: true,
          floatingFilter: false,
        }}
        onFirstDataRendered={onFirstDataRendered}
        ref={gridRef}
        rowData={rowData}
      />
    </div>
  );
};
