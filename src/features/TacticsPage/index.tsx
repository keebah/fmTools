import { Button } from "@radix-ui/themes";
import { useContext, useState } from "react";

import { Input } from "../../components/Input";
import { AppContext } from "../../context/AppContext";
import {
  attackGroup,
  calculateRoleScore,
  defenseGroup,
  keeperGroup,
  midfieldGroup,
  roleAttributes,
} from "../../helpers/roles";
import { sortByTotalScore } from "../../helpers/sorting";
import { Player, PlayerWithRole } from "../../types/player";
import { RoleWithKey } from "../../types/role";
import { Tactic, TacticPlayers } from "../../types/tactics";
import { BestRoleForPlayer } from "./BestRoleForPlayer";
import { TacticsGrid } from "./TacticsGrid";

export type SetTacticType = (
  action: "player" | "role",
  player: Player | undefined,
  position: keyof TacticPlayers,
  role: RoleWithKey | undefined
) => void;

export const TacticsPage = () => {
  const { primaryDataSet, settings } = useContext(AppContext);
  const [roleFilter, setRoleFilter] = useState([""]);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerWithRole[]>([]);
  const [tactic, setTacticState] = useState<Tactic>();
  const playersWithAllRoleScores = primaryDataSet?.players
    .filter(
      (player) => !selectedPlayers.some((item) => item.name === player.name)
    )
    ?.map((player) => {
      const filteredRoles = Object.entries(roleAttributes).filter(([key]) =>
        roleFilter.includes(key)
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
    <div>
      <div>
        <Button onClick={() => setSelectedPlayers([])}>Clear</Button>
        Scores: P: {tactic?.scores.primaryScore.toFixed(
          settings.decimals
        )} S: {tactic?.scores.secondaryScore.toFixed(settings.decimals)} T:{" "}
        {tactic?.scores.totalScore.toFixed(settings.decimals)}
      </div>
      <div className="flex">
        <div className="w-full">
          <TacticsGrid tactic={tactic} setTactic={setTactic} />
          <div className="grid grid-cols-4 gap-x-2">
            <div>Name</div>
            <div>Role 1</div>
            <div>Role 2</div>
            <div>Role 3</div>
            {playersWithAllRoleScores?.map((player) => (
              <>
                <div>{player.name}</div>
                <BestRoleForPlayer
                  roleFilter={roleFilter}
                  playerWithAllRoleScores={player}
                />
              </>
            ))}
          </div>
        </div>
        <div className="border border-black m-1 p-1 ml-auto min-w-[310px]">
          Filter Roles{" "}
          <Button onClick={() => setRoleFilter(Object.keys(roleAttributes))}>
            Select all
          </Button>{" "}
          <Button onClick={() => setRoleFilter([])}>Deselect all</Button>
          <div className="flex">
            {[keeperGroup, defenseGroup, midfieldGroup, attackGroup].map(
              (group) => (
                <div>
                  <Input
                    type="checkbox"
                    onChange={(e) => {
                      const groupKeys = Object.keys(group);
                      if (e.target.checked) {
                        setRoleFilter((prev) => [...prev, ...groupKeys]);
                      } else {
                        setRoleFilter((prev) =>
                          prev.filter((key) => !groupKeys.includes(key))
                        );
                      }
                    }}
                  />
                  All
                  {Object.keys(group).map((item) => (
                    <div className="flex">
                      <div>
                        <Input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setRoleFilter((prev) => [...prev, item]);
                            } else {
                              setRoleFilter((prev) =>
                                prev.filter((entry) => entry !== item)
                              );
                            }
                          }}
                          checked={roleFilter.includes(item)}
                        />
                      </div>
                      <div>{item}</div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
