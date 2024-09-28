import { useState } from "react";
import { calculateRoleScore, roleAttributes } from "../helpers/roles";
import { Player } from "../types/player";
import { Role } from "../types/role";
export const RoleTable = ({ content }: { content: Player[] | undefined }) => {
  const [role, setRole] = useState<Role | undefined>();

  if (!content) {
    return <>No content</>;
  }
  const playerData =
    role &&
    content
      ?.filter(
        (item) => item.name !== "Name" || !Object.keys(item).includes("name")
      )
      ?.map((player, index) => {
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
      });

  // console.log(playerData);
  return (
    <div>
      <div>Role:</div>
      <div>
        <select
          onChange={(e) => {
            const role = e.target.value as "BBMun";
            const stuff = roleAttributes[role];
            setRole(stuff);
          }}
        >
          <option></option>
          <option value={"BBMun"}>BBMun</option>
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
              {playerData?.map((player, index) => {
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
