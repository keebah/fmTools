import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { RoleTable } from "./RoleTable";

export const RoleGrid = () => {
  const { primaryDataSet } = useContext(AppContext);
  if (!primaryDataSet) {
    return <>Need to select data set</>;
  }
  return (
    <div className="grid grid-cols-7 w-full border border-black">
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>&nbsp;</div>
      {/* 10er Reihe */}
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      {/* 8er Reihe */}
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      {/* 6er Reihe */}{" "}
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      {/* Abwehr */}
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      {/* Torwart */} <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>
        <RoleTable content={primaryDataSet} />
      </div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      {/* a */}
    </div>
  );
};
