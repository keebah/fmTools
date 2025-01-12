import { SetTacticType } from ".";
import { RoleScoreDisplay } from "../../components/RoleScoreDisplay";
import { Data } from "../../types/player";
import { Role } from "../../types/role";
import { Tactic } from "../../types/tactics";
import { ProposalForEntry } from "./ProposalForEntry";

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
  position: keyof Tactic;
  tactic: Tactic;
  setTactic: SetTacticType;
}) => {
  const player = tactic[position]?.player;
  const role = tactic[position]?.role;

  const availablePlayers = content?.players.filter(
    (player) =>
      !Object.values(tactic).some((item) => item?.player?.name === player.name)
  );

  if (!content) {
    return <>No content</>;
  }

  console.log(tactic[position]?.player?.name);
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
            const role = allowedRoles[e.target.value];
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
