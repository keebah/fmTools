import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { RoleTable } from "./RoleTable";
import {
  attackGroup,
  defenseGroup,
  keeperGroup,
  midfieldGroup,
} from "../../helpers/roles";

export const RoleGrid = () => {
  const { primaryDataSet } = useContext(AppContext);
  if (!primaryDataSet) {
    return <>Need to select data set</>;
  }
  return (
    <div className="grid grid-cols-7 w-full border border-black">
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} group={attackGroup} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} group={attackGroup} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} group={attackGroup} />
      </div>
      <div>&nbsp;</div>
      {/* 10er Reihe */}
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      {/* 8er Reihe */}
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      {/* 6er Reihe */}{" "}
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} group={midfieldGroup} />
      </div>
      {/* Abwehr */}
      <div>
        <RoleTable content={primaryDataSet} group={defenseGroup} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} group={defenseGroup} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} group={defenseGroup} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} group={defenseGroup} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} group={defenseGroup} />
      </div>
      {/* Torwart */} <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} group={keeperGroup} />
      </div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      {/* a */}
    </div>
  );
};
