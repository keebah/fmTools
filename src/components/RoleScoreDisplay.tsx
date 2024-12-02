import { useContext } from "react";

import { AppContext } from "../context/AppContext";

export const RoleScoreDisplay = ({
  roleScore,
}: {
  roleScore: {
    primaryScore: number;
    secondaryScore: number;
    totalScore: number;
  };
}) => {
  const { settings } = useContext(AppContext);
  return (
    <div className="flex gap-x-1">
      <div>P: {roleScore?.primaryScore.toFixed(settings.decimals)}</div>
      <div>S: {roleScore?.secondaryScore.toFixed(settings.decimals)}</div>
      <div>T: {roleScore?.totalScore.toFixed(settings.decimals)}</div>
    </div>
  );
};
