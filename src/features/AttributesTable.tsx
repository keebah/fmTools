import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { useCallback, useMemo, useRef } from "react";
import { Attributes, Data } from "../types/player";
type ColumnType = "name" & keyof Attributes;

export const AttributesTable = ({
  primaryDataSet,
  secondaryDataSet,
}: {
  primaryDataSet: Data | undefined;
  secondaryDataSet: Data | undefined;
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const attributes = primaryDataSet?.players[0].attributes;

  const rowData = useMemo(
    () =>
      primaryDataSet?.players.map((player) => ({
        name: player.name,
        ...player.attributes,
      })),
    [primaryDataSet]
  );

  const colDefs = useMemo(() => {
    const attributeFields = attributes
      ? Object.keys(attributes).map((att) => {
          return { field: att as ColumnType };
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
      ...attributeFields,
    ];
  }, [attributes]);

  const fitAllColumns = useCallback(() => {
    gridRef?.current?.api.autoSizeAllColumns();
  }, []);

  const onFirstDataRendered = useCallback(() => {
    fitAllColumns();
  }, []);

  // Column Definitions: Defines the columns to be displayed.
  return (
    <div>
      Attribute:
      {primaryDataSet && primaryDataSet.players.length > 1 && (
        <table className="text-2xs" style={{ fontSize: "8px" }}>
          <thead>
            <th>Name</th>
            {Object.keys(primaryDataSet.players[1].attributes).map((att) => (
              <th>{att}</th>
            ))}
          </thead>
          <tbody>
            {primaryDataSet.players.map((player, index) => {
              if (index >= 1) {
                const compare = secondaryDataSet?.players.find(
                  (item) => item.name === player.name
                );
                return (
                  <tr>
                    <td>{player.name}</td>
                    {Object.entries(player.attributes).map(
                      ([attribute, value]) => {
                        if (compare) {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          const compareAtt =
                            compare?.attributes[attribute as keyof Attributes];
                          if (compareAtt) {
                            const delta = value - compareAtt;
                            return (
                              <td
                                style={{
                                  color: delta > 0 ? "#00FF00" : "#FF0000",
                                }}
                              >
                                {(value - compareAtt).toFixed(0)}
                              </td>
                            );
                          }
                        }
                        return <td>{value.toFixed(0)}</td>;
                      }
                    )}
                  </tr>
                );
              }
              return undefined;
            })}
          </tbody>
        </table>
      )}
      {/* {JSON.stringify(content)} */}
      <div style={{ height: 1000, width: 1000 }}>
        <AgGridReact
          ref={gridRef}
          className="overflow-visible border-b-[2px] border-gray-900 pb-1"
          rowData={rowData}
          columnDefs={colDefs}
          animateRows={true}
          onFirstDataRendered={onFirstDataRendered}
        />
      </div>
    </div>
  );
};
