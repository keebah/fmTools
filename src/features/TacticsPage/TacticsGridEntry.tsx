import { Dispatch, SetStateAction, useState } from "react";
import { Select } from "../../components/Select";
import { calculateRoleScore, roleAttributes } from "../../helpers/roles";
import { Data, PlayerWithRole } from "../../types/player";
import { Role, Roles } from "../../types/role";

type SelectedRole = { name: string } & Role;

export const TacticsGridEntry = ({
  content,
  group,
  selectedPlayers,
  setSelectedPlayers,
}: {
  content: Data | undefined;
  group: any;
  selectedPlayers: PlayerWithRole[];
  setSelectedPlayers: Dispatch<SetStateAction<PlayerWithRole[]>>;
}) => {
  const [role, setRole] = useState<SelectedRole | undefined>();

  const availablePlayers = content?.players.filter(
    (player) => !selectedPlayers.some((item) => item.name === player.name)
  );

  if (!content) {
    return <>No content</>;
  }
  // const playerData =
  //   role &&
  //   content.players
  //     ?.filter(
  //       (item) => item.name !== "Name" || !Object.keys(item).includes("name")
  //     )
  //     ?.map((player) => {
  //       const roleValues = calculateRoleScore(player, role);
  //       return {
  //         ...player,
  //         ...roleValues,
  //       };
  //     })
  //     .sort((a, b) => {
  //       if (a?.primaryScore > b?.primaryScore) {
  //         return -1;
  //       }
  //       return 1;
  //     })
  //     .slice(0, 10);

  return (
    <div className="border border-black p-1 rounded-md">
      <div>
        <Select
          onChange={(current: string, update: string) => {
            const player = availablePlayers?.find(
              (player) => player.name === update
            );
            if (player && role) {
              const roleScore = calculateRoleScore(player, role);
              const playerWithRole = {
                ...player,
                roleName: "F9" as keyof Roles,
                ...roleScore,
              };
              setSelectedPlayers((prev) => {
                return [
                  ...prev.filter((item) => item.name !== player.name),
                  playerWithRole,
                ];
              });
              console.log(player);
            }
          }}
        >
          {availablePlayers?.map((player) => (
            <option key={player.name} value={player.name}>
              {player.name}
            </option>
          ))}
        </Select>
      </div>
      <div className="items-center justify-center w-full">
        Role:{" "}
        <select
          onChange={(e) => {
            const attr = roleAttributes[e.target.value as keyof Roles];
            setRole({ name: e.target.value, ...attr });
          }}
        >
          <option></option>
          {Object.keys(group).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
      </div>
      {/* <div>
        {role && playerData && playerData?.length > 1 && (
          <table className="text-2xs" style={{ fontSize: "12px" }}>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th colSpan={2}>Attribute</th>
                <th>&nbsp;</th>
              </tr>
              <tr>
                <th>Name</th>
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
                    <td>{player?.primaryScore.toFixed(1)}</td>
                    <td>{player?.secondaryScore.toFixed(1)}</td>
                    <td>{player?.totalScore.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div> */}
    </div>
  );
};
