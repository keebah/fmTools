import { RoleScoreDisplay } from "../../components/RoleScoreDisplay";
import { calculateRoleScore } from "../../helpers/roles";
import { sortByTotalScore } from "../../helpers/sorting";
import { Player } from "../../types/player";
import { Role } from "../../types/role";

export const ProposalForEntry = ({
  availablePlayers,
  role,
}: {
  availablePlayers: Player[] | undefined;
  role: Role;
}) => {
  if (!availablePlayers) {
    return <></>;
  }

  const scores = availablePlayers
    .map((player) => {
      const score = calculateRoleScore(player, role);
      return { ...player, ...score };
    })
    .sort(sortByTotalScore);
  return (
    <div className="grid grid-cols-2 text-xs">
      {scores
        .map((player) => (
          <>
            <div>{player.name}</div>
            <div>
              <RoleScoreDisplay player={player} role={role} />
            </div>
          </>
        ))
        .slice(0, 3)}
    </div>
  );
};
