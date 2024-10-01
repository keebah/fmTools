import { useState } from "react";
import { calculateRoleScore, roleAttributes } from "../../helpers/roles";
import { Data } from "../../types/player";
import { Role, Roles } from "../../types/role";
export const RoleTable = ({
  content,
  group,
}: {
  content: Data | undefined;
  group: any;
}) => {
  const [role, setRole] = useState<Role | undefined>();

  if (!content) {
    return <>No content</>;
  }
  const playerData =
    role &&
    content.players
      ?.filter(
        (item) => item.name !== "Name" || !Object.keys(item).includes("name")
      )
      ?.map((player) => {
        const roleValues = calculateRoleScore(player, role);
        return {
          ...player,
          ...roleValues,
        };
      })
      .sort((a, b) => {
        if (a?.totalScore > b?.totalScore) {
          return -1;
        }
        return 1;
      })
      .slice(0, 5);

  return (
    <div>
      <div>Role:</div>
      <div>
        <select
          onChange={(e) => {
            const stuff = roleAttributes[e.target.value as keyof Roles];
            setRole(stuff);
          }}
        >
          <option></option>
          {Object.keys(group).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
      </div>
      <div>
        {role && playerData && playerData?.length > 1 && (
          <table className="text-2xs" style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th colSpan={3}>Physis</th>
                <th colSpan={2}>Attribute</th>
                <th>&nbsp;</th>
              </tr>
              <tr>
                <th>Name</th>
                <th>Defensiv</th>
                <th>Mittelfeld</th>
                <th>Offensiv</th>
                <th>Primär</th>
                <th>Sekundär</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {playerData?.map((player) => {
                return (
                  <tr>
                    <td>{player?.name}</td>
                    <td>{player?.physis?.abwehr.toFixed(1)}</td>
                    <td>{player?.physis?.mittelfeld.toFixed(1)}</td>
                    <td>{player?.physis?.angriff.toFixed(1)}</td>
                    <td>{player?.primaryScore.toFixed(1)}</td>
                    <td>{player?.secondaryScore.toFixed(1)}</td>
                    <td>{player?.totalScore.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
