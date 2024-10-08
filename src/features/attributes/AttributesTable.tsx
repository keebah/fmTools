import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { useCallback, useMemo, useRef } from "react";
import { Attributes, Data, Player } from "../../types/player";

type ColumnType = "name" & keyof Attributes;

const calcTotalAttributes = (attributes: Attributes | undefined) => {
  if (!attributes) {
    return 0;
  }
  return Object.values(attributes).reduce((a, b) => {
    return a + b;
  });
};

export const AttributesTable = ({
  primaryDataSet,
  secondaryDataSet,
  showChangesOnly,
}: {
  primaryDataSet: Data | undefined;
  secondaryDataSet: Data | undefined;
  showChangesOnly: boolean;
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const attributes = primaryDataSet?.players[0].attributes;
  const returnAttributes = (firstPlayer: Player) => {
    if (secondaryDataSet) {
      const secondPlayer = secondaryDataSet.players.find(
        (secondPlayer) => firstPlayer.name === secondPlayer.name
      );
      if (secondPlayer) {
        const attributes = structuredClone(firstPlayer.attributes);
        Object.keys(attributes).forEach((key) => {
          const thisKey = key as keyof Attributes;
          attributes[thisKey] =
            secondPlayer.attributes[thisKey] - firstPlayer.attributes[thisKey];
        });

        return { total: calcTotalAttributes(attributes), ...attributes };
      }
      return undefined;
    }
    return {
      total: calcTotalAttributes(firstPlayer.attributes),
      ...firstPlayer.attributes,
    };
  };

  const rowData = primaryDataSet?.players
    .map((player) => ({
      name: player.name,
      ...returnAttributes(player),
    }))
    .filter((item) => {
      if (!secondaryDataSet) {
        return true;
      }
      if (showChangesOnly) {
        const hasNothing = Object.entries(item).map(([key, value]) => {
          if (key === "name") {
            return undefined;
          }
          if (Number.isNaN(value) || value === 0) {
            return undefined;
          }
          return value;
        });
        return hasNothing.some((item) => item);
      }
      return true;
    });

  const colDefs = useMemo(() => {
    const attributeFields = attributes
      ? Object.keys(attributes)
          .map((att) => {
            if (showChangesOnly) {
              const hasValue = rowData?.find(
                (item) => item[att as keyof Attributes] !== 0
              );
              if (!hasValue) {
                return {
                  field: undefined,
                  maxWidth: 1,
                  headerName: att.substring(0, 4),
                };
              }
            }
            return {
              field: att as ColumnType,
              maxWidth: 76,
              headerName: att.substring(0, 4),
            };
          })
          .filter((item) => item.field !== undefined)
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
      ...attributeFields,
    ];
  }, [attributes, rowData, showChangesOnly]);

  const fitAllColumns = useCallback(() => {
    gridRef?.current?.api.autoSizeAllColumns();
  }, []);

  const onFirstDataRendered = useCallback(() => {
    fitAllColumns();
  }, [fitAllColumns]);

  return (
    <div className="w-full h-[calc(100vh-150px)] overflow-visible border-b-[2px] border-gray-900 pb-1 ag-theme-alpine">
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
