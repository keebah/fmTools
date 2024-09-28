import React from "react";
import { Player } from "../types/player";

export const AttributesTable = ({
  content,
}: {
  content: Player[] | undefined;
}) => {
  return (
    <div>
      Attribute:
      {content && content.length > 1 && (
        <table className="text-2xs" style={{ fontSize: "8px" }}>
          <thead>
            <th>Name</th>
            {Object.keys(content[1].attributes).map((att) => (
              <th>{att}</th>
            ))}
          </thead>
          <tbody>
            {content.map((player, index) => {
              if (index >= 2) {
                return (
                  <tr>
                    <td>{player.name}</td>
                    {Object.values(player.attributes).map((att) => (
                      <td>{att.toFixed(0)}</td>
                    ))}
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
