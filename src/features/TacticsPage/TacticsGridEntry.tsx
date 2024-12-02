import { Dispatch, SetStateAction, useState } from "react";

import { RoleScoreDisplay } from "../../components/RoleScoreDisplay";
import { calculateRoleScore, roleAttributes } from "../../helpers/roles";
import { Data, PlayerWithRole } from "../../types/player";
import { Role, Roles } from "../../types/role";
import { ProposalForEntry } from "./ProposalForEntry";

export type SelectedRole = { roleName: string } & Role;

const emptyRoleScore = {
  roleName: "F9" as keyof Roles,
  primaryScore: 0,
  secondaryScore: 0,
  totalScore: 0,
};

export const TacticsGridEntry = ({
  content,
  group,
  selectedPlayers,
  setSelectedPlayers,
}: {
  content: Data | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  group: any;
  selectedPlayers: PlayerWithRole[];
  setSelectedPlayers: Dispatch<SetStateAction<PlayerWithRole[]>>;
}) => {
  const [role, setRole] = useState<SelectedRole | undefined>();
  const [player, setPlayer] = useState<PlayerWithRole | undefined>();
  const availablePlayers = content?.players.filter(
    (player) => !selectedPlayers.some((item) => item.name === player.name)
  );

  if (!content) {
    return <>No content</>;
  }

  return (
    <div className="border border-black p-1 rounded-md">
      <div>
        <select
          onChange={(e) => {
            const newPlayer =
              availablePlayers?.find(
                (player) => player.name === e.target.value
              ) || undefined;
            if (newPlayer) {
              if (role) {
                const newRoleScore = calculateRoleScore(newPlayer, role);
                const playerWithRole = {
                  ...newPlayer,
                  ...newRoleScore,
                  roleName: role.roleName as keyof Roles,
                };
                setSelectedPlayers((prev) => [
                  ...prev.filter((item) => item.name !== player?.name),
                  playerWithRole,
                ]);
                setPlayer(playerWithRole);
              } else {
                const playerWithEmptyRole = { ...newPlayer, ...emptyRoleScore };
                setSelectedPlayers((prev) => [
                  ...prev.filter((item) => item.name !== player?.name),
                  playerWithEmptyRole,
                ]);
                setPlayer(playerWithEmptyRole);
              }
            } else {
              setSelectedPlayers((prev) => [
                ...prev.filter((item) => item.name !== player?.name),
              ]);
              setPlayer(undefined);
            }
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
            const newRoleName = e.target.value as keyof Roles;
            const newRole = {
              roleName: newRoleName,
              ...roleAttributes[newRoleName],
            };
            if (newRoleName) {
              setRole(newRole);
              if (player) {
                const newRoleScore = calculateRoleScore(player, newRole);
                const playerWithRole = {
                  ...player,
                  ...newRoleScore,
                  roleName: newRoleName as keyof Roles,
                };
                setSelectedPlayers((prev) => [
                  ...prev.filter((item) => item.name !== player?.name),
                  playerWithRole,
                ]);
                setPlayer(playerWithRole);
              }
            } else {
              setRole(undefined);
              if (player) {
                const playerWithEmptyRole = { ...player, ...emptyRoleScore };
                setSelectedPlayers((prev) => [
                  ...prev.filter((item) => item.name !== player?.name),
                  playerWithEmptyRole,
                ]);
                setPlayer(playerWithEmptyRole);
              }
            }
          }}
        >
          <option></option>
          {Object.keys(group).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
        {player && <RoleScoreDisplay roleScore={player} />}
      </div>
      {!player && role && (
        <>
          <ProposalForEntry availablePlayers={availablePlayers} role={role} />
        </>
      )}
    </div>
  );
};
