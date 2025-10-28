import { SetTacticType } from ".";
import { RoleScoreDisplay } from "../../components/RoleScoreDisplay";
import { Data } from "../../types/player";
import { Role, Roles } from "../../types/role";
import { Tactic, TacticPlayers } from "../../types/tactics";

export type SelectedRole = { roleName: string } & Role;

export const TacticsGridEntry = ({
  allowedRoles,
  content,
  position,
  tactic,
  setTactic,
}: {
  allowedRoles: { [key: string]: Role };
  content: Data | undefined;
  position: keyof TacticPlayers;
  tactic: Tactic | undefined;
  setTactic: SetTacticType;
}) => {
  const players = tactic?.players;
  const player = players && players[position]?.player;
  const role = players && players[position]?.role;

  const availablePlayers = content?.players.filter(
    (player) =>
      !Object.values(tactic?.players || {}).some(
        (item) => item?.player?.name === player.name
      )
  );

  if (!content) {
    return <>No content</>;
  }

  // need to change this over to radixui I guess
  return (
    <div className="border border-black p-1 rounded-md">
      <div>
        <select
          onChange={(e) => {
            const player = content.players.find(
              (player) => player.name === e.target.value
            );
            setTactic("player", player, position, undefined);
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
            const role = {
              ...allowedRoles[e.target.value],
              key: e.target.value as keyof Roles,
            };

            setTactic("role", undefined, position, role);
          }}
        >
          <option></option>
          {Object.keys(allowedRoles).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
        {player && <RoleScoreDisplay player={player} role={role} />}
      </div>
      {!player && role && (
        <>
          <ProposalForEntry availablePlayers={availablePlayers} role={role} />
        </>
      )}
    </div>
  );
};
