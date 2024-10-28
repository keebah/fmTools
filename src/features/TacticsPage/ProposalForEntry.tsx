import { RoleScoreDisplay } from "../../components/RoleScoreDisplay";
import { calculateRoleScore } from "../../helpers/roles";
import { sortByTotalScore } from "../../helpers/sorting";
import { Player } from "../../types/player";
import { SelectedRole } from "./TacticsGridEntry";

export const ProposalForEntry = ({
  availablePlayers,
  role,
}: {
  availablePlayers: Player[] | undefined;
  role: SelectedRole;
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
              <RoleScoreDisplay roleScore={player} />
            </div>
          </>
        ))
        .slice(0, 3)}
    </div>
  );
};
