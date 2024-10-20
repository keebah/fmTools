import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Player } from "../../types/player";

type playerWithAllRoleScores = Player & {
  sortedScores: {
    primaryScore: number;
    secondaryScore: number;
    totalScore: number;
    name: string;
  }[];
  totalScore: number;
};
export const BestRoleForPlayer = ({
  roleFilter,
  playerWithAllRoleScores,
}: {
  roleFilter: string[];
  playerWithAllRoleScores: playerWithAllRoleScores | undefined;
}) => {
  const { settings } = useContext(AppContext);

  const sortedRoles = playerWithAllRoleScores?.sortedScores;

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
