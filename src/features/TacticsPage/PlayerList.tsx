import { Card, Grid } from "@radix-ui/themes";
import { Fragment, useContext } from "react";

import { AppContext } from "../../context/AppContext";
import { calculateRoleScore, roleAttributes } from "../../helpers/roles";
import { sortByTotalScore } from "../../helpers/sorting";
import { Player } from "../../types/player";
import { RoleWithKey } from "../../types/role";
import { Tactic, TacticPlayers } from "../../types/tactics";
import { cn } from "../utils/tailwind";

const returnRoleScore = (
  player: Player,
  selectedRole: RoleWithKey | undefined
) => {
  if (selectedRole) {
    return {
      roleName: selectedRole.key,
      ...calculateRoleScore(player, selectedRole),
    };
  }
  const rolesWithScore = Object.entries(roleAttributes)
    .map(([key, role]) => {
      const roleScore = calculateRoleScore(player, role);
      return { roleName: key, ...roleScore };
    })
    .sort(sortByTotalScore);
  console.log(player, rolesWithScore);
  return rolesWithScore[0];
};

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
      const roleScore = returnRoleScore(player, selectedRole);
      return {
        ...player,
        ...roleScore,
      };
    })
    .sort(sortByTotalScore);

  return (
    <Card>
      {selectedRole
        ? `Showing score for: ${selectedRole.key}`
        : `No Role Selected for position ${focusedPosition}`}
      <Grid columns="3" gapX="1">
        {playersWithAllRoleScores?.map((item) => (
          <Fragment key={item.name}>
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
            <div>{item.roleName}</div>
          </Fragment>
        ))}
      </Grid>
    </Card>
  );
};
