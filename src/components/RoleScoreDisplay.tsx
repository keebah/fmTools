import { useContext } from "react";

import { AppContext } from "../context/AppContext";
import { calculateRoleScore } from "../helpers/roles";
import { Player } from "../types/player";
import { Role } from "../types/role";

export const RoleScoreDisplay = ({
  player,
  role,
}: {
  player?: Player;
  role?: Role;
}) => {
  const { settings } = useContext(AppContext);
  if (!player || !role) {
    return (
      <div className="flex gap-x-1">
        <div>P: ?</div>
        <div>S: ?</div>
        <div>T: ?</div>
      </div>
    );
  }

  const roleScore = calculateRoleScore(player, role);
  return (
    <div className="flex gap-x-1">
      <div>P: {roleScore?.primaryScore.toFixed(settings.decimals)}</div>
      <div>S: {roleScore?.secondaryScore.toFixed(settings.decimals)}</div>
      <div>T: {roleScore?.totalScore.toFixed(settings.decimals)}</div>
    </div>
  );
};
