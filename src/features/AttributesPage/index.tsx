import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AttributesTable } from "./AttributesTable";

export const AttributesPage = () => {
  const [showChangesOnly, setShowChangesOnly] = useState(false);
  const { data, primaryDataSet, secondaryDataSet, setSecondaryDataSet } =
    useContext(AppContext);
  return (
    <div className="w-full">
      <div className="m-1">
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
          onChange={(e) => {
            setShowChangesOnly(!showChangesOnly);
          }}
          checked={showChangesOnly}
        />
        Show Changes Only (+ means secondary is higher than primary){" "}
        <input disabled type="checkbox" checked={false} />
        Hide empty columns
      </div>
      <div>
        <AttributesTable
          primaryDataSet={primaryDataSet}
          secondaryDataSet={secondaryDataSet}
          showChangesOnly={showChangesOnly}
        />
      </div>
    </div>
  );
};
