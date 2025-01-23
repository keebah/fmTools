import { ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { useCallback, useContext, useMemo, useRef } from "react";

import { AppContext } from "../../context/AppContext";
import { dummyPlayer } from "../../helpers/player";
import {
  calculateFMRoleScore,
  calculateUserRoleScore,
} from "../../helpers/roles";
import { Attributes, Data, Player } from "../../types/player";
import { RoleWithKey } from "../../types/role";
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

const scoreColumnProps = (decimals: number, maxWidth: number) => {
  return {
    cellRenderer: ({ value }: ICellRendererParams) => value.toFixed(decimals),
    filter: true,
    flex: 1,
    floatingFilter: false,
    sortable: true,
    maxWidth: maxWidth,
  };
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
  roleFilter?: RoleWithKey;
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

    const returnFibra = () => {
      if (!secondaryDataSet) {
        return playerInPrimaryDataSet.fibra;
      }
      const playerInSecondaryDataSet = secondaryDataSet.players.find(
        (secondPlayer) => playerInPrimaryDataSet.name === secondPlayer.name
      );
      if (playerInSecondaryDataSet) {
        return playerInPrimaryDataSet.fibra - playerInSecondaryDataSet.fibra;
      }
      // if we don't find the player in the compare set we return NaNs to be able to
      // filter easier afterwards
      return playerInPrimaryDataSet.fibra;
    };
    const attributes = returnPlayerAttributes();
    const fibra = returnFibra();
    const roleValues =
      roleFilter !== undefined
        ? calculateFMRoleScore(playerInPrimaryDataSet, roleFilter, settings)
        : { primaryScore: 0, secondaryScore: 0, totalScore: 0 };
    const userRoleValue =
      roleFilter !== undefined
        ? calculateUserRoleScore(playerInPrimaryDataSet, roleFilter, settings)
        : 0;
    return {
      fibra,
      fmp: roleValues?.primaryScore,
      fms: roleValues?.secondaryScore,
      fmt: roleValues?.totalScore,
      total: calcTotalAttributes(attributes), // This is for the average of all the visible attributes
      user: userRoleValue,
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
      {
        ...scoreColumnProps(settings.decimals, 96),
        field: "fibra" as ColumnType,
        headerTooltip: "Kampfgeist score",
        title: "FIBRA",
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
              ...scoreColumnProps(settings.decimals, 76),
              field: "fmp" as ColumnType,
              headerTooltip:
                "Average of the primary attributes for selected role",
              title: "FMP",
            },
            {
              ...scoreColumnProps(settings.decimals, 76),
              field: "fms" as ColumnType,
              headerTooltip:
                "Average of the secondary attributes for selected role",
              title: "FMS",
            },
            {
              ...scoreColumnProps(settings.decimals, 76),
              field: "fmt" as ColumnType,
              headerTooltip:
                "Weighted average of the primary and secondary attributes for selected role",
              title: "FMT",
            },
            {
              ...scoreColumnProps(settings.decimals, 96),
              field: "user" as ColumnType,
              headerTooltip:
                "Weighted average of attributes from the user setting",
              title: "User",
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
