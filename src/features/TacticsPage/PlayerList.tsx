import { Card, Grid } from "@radix-ui/themes";
import { useContext } from "react";

import { AppContext } from "../../context/AppContext";
import { calculateRoleScore, roleAttributes } from "../../helpers/roles";
import { sortByTotalScore } from "../../helpers/sorting";
import { Player } from "../../types/player";
import { Tactic, TacticPlayers } from "../../types/tactics";
import { cn } from "../utils/tailwind";

export const PlayerList = ({
  focusedPosition,
  tactic,
}: {
  focusedPosition: keyof TacticPlayers | undefined;
  tactic: Tactic | undefined;
}) => {
  const { primaryDataSet, settings } = useContext(AppContext);

  const selectedPosition =
    focusedPosition && tactic?.players
      ? tactic.players[focusedPosition]
      : undefined;
  const selectedRole = selectedPosition?.role;
  const selectedPlayer = selectedPosition?.player;

  const allPlayersInTactics =
    (tactic?.players &&
      Object.values(tactic.players)
        ?.map((item) => item?.player?.name)
        .filter((item) => item != undefined)) ??
    [];

  const playerIsUsedInTactic = (player: Player | undefined) => {
    return allPlayersInTactics.some((item) => item === player?.name);
  };

  const playersWithAllRoleScores = primaryDataSet?.players
    ?.map((player) => {
      const filteredRoles = Object.entries(roleAttributes).filter(
        ([key]) => selectedRole?.key === key
      );
      const roleScores = filteredRoles
        .map(([key, role]) => {
          const roleScore = calculateRoleScore(player, role);
          return { name: key, ...roleScore };
        })
        .sort(sortByTotalScore);
      const sortedScores = roleScores && roleScores.sort(sortByTotalScore);
      return {
        ...player,
        sortedScores,
        totalScore: sortedScores.length > 0 ? sortedScores[0].totalScore : 0, // it's actually the highest score but like this I can re-use the sort function
      };
    })
    .sort(sortByTotalScore);
  return (
    <Card>
      {selectedRole
        ? `Showing score for: ${selectedRole.key}`
        : "No Role Selected"}
      <Grid columns="2" gapX="1">
        {playersWithAllRoleScores?.map((item) => (
          <>
            <div
              className={cn(
                item.name === selectedPlayer?.name
                  ? "font-bold"
                  : playerIsUsedInTactic(item)
                  ? "opacity-50"
                  : ""
              )}
            >
              {item.name}
            </div>
            <div
              className={cn(
                item.name === selectedPlayer?.name
                  ? "font-bold"
                  : playerIsUsedInTactic(item)
                  ? "opacity-50"
                  : ""
              )}
            >
              {item.totalScore.toFixed(settings.decimals)}
            </div>
          </>
        ))}
      </Grid>
    </Card>
  );
};
