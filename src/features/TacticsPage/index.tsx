import { Card, Flex } from "@radix-ui/themes";
import { useContext, useState } from "react";

import { AppContext } from "../../context/AppContext";
import { calculateRoleScore } from "../../helpers/roles";
import { Player } from "../../types/player";
import { RoleWithKey } from "../../types/role";
import { Tactic, TacticPlayers } from "../../types/tactics";
import { PlayerList } from "./PlayerList";
import { TacticsGrid } from "./TacticsGrid";

export type SetTacticType = (
  action: "player" | "role",
  player: Player | undefined,
  position: keyof TacticPlayers,
  role: RoleWithKey | undefined
) => void;

export const TacticsPage = () => {
  const { primaryDataSet, settings } = useContext(AppContext);
  // const [roleFilter, setRoleFilter] = useState([""]);
  // const [selectedPlayers, setSelectedPlayers] = useState<PlayerWithRole[]>([]);
  const [focusedPosition, setFocusedPositions] = useState<
    keyof TacticPlayers | undefined
  >();
  const [tactic, setTacticState] = useState<Tactic>();

  const setTactic: SetTacticType = (action, player, position, role) => {
    setTacticState((prev) => {
      const prevPlayers = prev?.players;
      const prevSlot = prevPlayers && prevPlayers[position];

      const updateTactics = () => {
        switch (action) {
          case "player":
            return { ...prevPlayers, [position]: { ...prevSlot, player } };
          case "role":
            return { ...prevPlayers, [position]: { ...prevSlot, role } };
        }
      };
      const updatedPlayers = updateTactics();
      // now calculate score
      const scores = Object.values(updatedPlayers || {}).reduce(
        (acc, val) => {
          if (val.player && val.role) {
            const score = calculateRoleScore(val?.player, val?.role);
            return {
              primaryScore: acc.primaryScore + score.primaryScore,
              secondaryScore: acc.secondaryScore + score.secondaryScore,
              totalScore: acc.totalScore + score.totalScore,
            };
          }

          return acc;
        },
        { primaryScore: 0, secondaryScore: 0, totalScore: 0 }
      );
      return {
        ...prev,
        players: updatedPlayers,
        scores,
      };
    });
  };

  if (!primaryDataSet) {
    return <>Need to select data set</>;
  }

  return (
    <>
      <Flex>
        <div>
          <Card>
            <TacticsGrid
              tactic={tactic}
              setTactic={setTactic}
              setFocusedPosition={setFocusedPositions}
            />
          </Card>
          <Flex>
            <Card>
              Scores: P:{" "}
              {tactic?.scores.primaryScore.toFixed(settings.decimals)} S:{" "}
              {tactic?.scores.secondaryScore.toFixed(settings.decimals)} T:{" "}
              {tactic?.scores.totalScore.toFixed(settings.decimals)}
            </Card>
            <Card></Card>
          </Flex>
        </div>
        <PlayerList focusedPosition={focusedPosition} tactic={tactic} />
      </Flex>
    </>
  );
};
