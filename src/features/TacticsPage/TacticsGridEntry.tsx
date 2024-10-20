import { Dispatch, SetStateAction, useState } from "react";
import { Select } from "../../components/Select";
import { calculateRoleScore, roleAttributes } from "../../helpers/roles";
import { Data, Player, PlayerWithRole } from "../../types/player";
import { Role, Roles } from "../../types/role";
import { RoleScoreDisplay } from "../../components/RoleScoreDisplay";

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
  const [player, setPlayer] = useState<PlayerWithRole | undefined>();
  const availablePlayers = content?.players.filter(
    (player) => !selectedPlayers.some((item) => item.name === player.name)
  );

  const handleChange = (
    prevPlayer: PlayerWithRole | undefined,
    newPlayerName: string | undefined,
    newRoleName: keyof Roles | undefined
  ) => {
    const newPlayer = newPlayerName
      ? availablePlayers?.find((player) => player.name === newPlayerName)
      : prevPlayer;
    const newRole = newRoleName
      ? { name: newRoleName, ...roleAttributes[newRoleName] }
      : role;
    const roleScore =
      newPlayer && newRole
        ? calculateRoleScore(newPlayer, newRole)
        : { primaryScore: 0, secondaryScore: 0, totalScore: 0 };
    const playerWithRole = {
      ...newPlayer,
      roleName: newRoleName,
      ...roleScore,
    };
    if (playerWithRole) {
      setSelectedPlayers((prev) => {
        return [
          ...(prev.filter((item) => item.name !== prevPlayer?.name) || []),
          playerWithRole,
        ];
      });

      setPlayer(playerWithRole);
    }
    setRole(newRole);
  };

  console.log(selectedPlayers, player);

  if (!content) {
    return <>No content</>;
  }

  return (
    <div className="border border-black p-1 rounded-md">
      <div>
        <select
          onChange={(e) => {
            handleChange(player, e.target.value, undefined);
          }}
          value={player?.name}
        >
          <option></option>{" "}
          {player && (
            <option key={player.name} value={player.name}>
              {player.name}
            </option>
          )}
          {availablePlayers?.map((player) => (
            <option key={player.name} value={player.name}>
              {player.name}
            </option>
          ))}
        </select>
      </div>
      <div className="items-center justify-center w-full flex">
        <select
          onChange={(e) => {
            handleChange(player, undefined, e.target.value as keyof Roles);
          }}
        >
          <option></option>
          {Object.keys(group).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
        {player && <RoleScoreDisplay roleScore={player} />}
      </div>
    </div>
  );
};
