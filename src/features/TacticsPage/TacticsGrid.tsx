import { useContext } from "react";

import { SetTacticType } from ".";
import { AppContext } from "../../context/AppContext";
import { attackGroup } from "../../helpers/roles";
import { Tactic } from "../../types/tactics";
import { TacticsGridEntry } from "./TacticsGridEntry";

export const TacticsGrid = ({
  tactic,
  setTactic,
}: {
  tactic: Tactic;
  setTactic: SetTacticType;
}) => {
  const { primaryDataSet } = useContext(AppContext);

  return (
    <div className="grid grid-cols-7 w-full border border-black gap-1 p-1 m-1">
      <div>&nbsp;</div>
      <div>
        <TacticsGridEntry
          allowedRoles={attackGroup}
          position={"STZL"}
          content={primaryDataSet}
          tactic={tactic}
          setTactic={setTactic}
        />
      </div>
    </div>
  );
};
