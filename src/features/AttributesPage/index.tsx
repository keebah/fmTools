import { useContext, useState } from "react";

import { AppContext } from "../../context/AppContext";
import { Role } from "../../types/role";
import { RoleSelector } from "../common/RoleSelector";
import { AttributesTable } from "./AttributesTable";

export const AttributesPage = () => {
  const [showChangesOnly, setShowChangesOnly] = useState(false);
  const [hideEmptyColumns, setHideEmptyColumns] = useState(false);

  const [role, setRole] = useState<Role | undefined>();

  const { data, primaryDataSet, secondaryDataSet, setSecondaryDataSet } =
    useContext(AppContext);
  return (
    <div className="w-full">
      <div className="m-1 flex">
        Select Compare Set:
        <select
          className="mx-1"
          onChange={(e) => {
            const selectedDataSet = data?.find(
              (entry) => entry.name === e.target.value
            );
            setSecondaryDataSet(selectedDataSet);
          }}
        >
          <option></option>
          {data?.map((entry) => (
            <option>{entry.name}</option>
          ))}
        </select>
        <input
          type="checkbox"
          onChange={() => {
            setShowChangesOnly(!showChangesOnly);
          }}
          checked={showChangesOnly}
        />
        Changes Only (+ primary &gt; secondary)
        <input
          type="checkbox"
          onChange={() => {
            setHideEmptyColumns(!hideEmptyColumns);
          }}
          checked={hideEmptyColumns}
        />
        Hide empty columns{" "}
        <div className="ml-2">
          Role Filter <RoleSelector setRole={setRole} />
        </div>
      </div>
      <div>
        <AttributesTable
          hideEmptyColumns={hideEmptyColumns}
          primaryDataSet={primaryDataSet}
          roleFilter={role}
          secondaryDataSet={secondaryDataSet}
          showChangesOnly={showChangesOnly}
        />
      </div>
    </div>
  );
};
