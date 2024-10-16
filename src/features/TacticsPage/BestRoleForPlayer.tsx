import { useContext } from "react";
import { calculateRoleScore, roleAttributes } from "../../helpers/roles";
import { Player } from "../../types/player";
import { AppContext } from "../../context/AppContext";
import { sortByTotalScore } from "../../helpers/sorting";

export const BestRoleForPlayer = ({
  roleFilter,
  selectedPlayer,
}: {
  roleFilter: string[];
  selectedPlayer: Player | undefined;
}) => {
  const { settings } = useContext(AppContext);

  const sortedRoles =
    selectedPlayer &&
    Object.entries(roleAttributes)
      .map(([key, role]) => {
        const roleScore = calculateRoleScore(selectedPlayer, role);
        return { name: key, ...roleScore };
      })
      .sort(sortByTotalScore);

  if (!sortedRoles) {
    return <></>;
  }

  const filteredRoles = sortedRoles?.filter((item) =>
    roleFilter.includes(item.name)
  );

  return (
    <>
      {[0, 1, 2].map((index) => (
        <div className="grid grid-cols-4">
          <div>{filteredRoles[index]?.name}</div>
          <div>
            {filteredRoles[index]?.primaryScore.toFixed(settings.decimals)}
          </div>
          <div>
            {filteredRoles[index]?.secondaryScore.toFixed(settings.decimals)}
          </div>
          <div>
            {filteredRoles[index]?.totalScore.toFixed(settings.decimals)}
          </div>
        </div>
      ))}
    </>
  );
};
