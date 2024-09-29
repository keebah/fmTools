import { Attributes, Data } from "../types/player";

export const AttributesTable = ({
  primaryDataSet,
  secondaryDataSet,
}: {
  primaryDataSet: Data | undefined;
  secondaryDataSet: Data | undefined;
}) => {
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
    </div>
  );
};
