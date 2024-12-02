import { useContext } from "react";

import { AppContext } from "../../context/AppContext";
import { calculateRoleScore, roleAttributes } from "../../helpers/roles";
import { sortByTotalScore } from "../../helpers/sorting";
import { Player } from "../../types/player";

export const AllRolesForPlayer = ({
  selectedPlayer,
}: {
  selectedPlayer: Player | undefined;
}) => {
  const { settings } = useContext(AppContext);

  const rolesWithScore =
    selectedPlayer &&
    Object.entries(roleAttributes)
      .map(([key, role]) => {
        const roleScore = calculateRoleScore(selectedPlayer, role);
        return { name: key, ...roleScore };
      })
      .sort(sortByTotalScore);

  return (
    <div className="grid grid-cols-4">
      <div>Name</div>
      <div>Primary</div>
      <div>Secondary</div>
      <div>Total</div>
      {rolesWithScore?.map((item) => {
        return (
          <>
            <div>{item.name}</div>
            <div>{item.primaryScore.toFixed(settings.decimals)}</div>
            <div>{item.secondaryScore.toFixed(settings.decimals)}</div>
            <div>{item.totalScore.toFixed(settings.decimals)}</div>
          </>
        );
      })}
    </div>
  );
};
