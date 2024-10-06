import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { AttributesTable } from "./AttributesTable";

export const AttributeView = () => {
  const [showChangesOnly, setShowChangesOnly] = useState(false);
  const {
    data,
    primaryDataSet,
    setPrimaryDataSet,
    secondaryDataSet,
    setSecondaryDataSet,
  } = useContext(AppContext);
  return (
    <div className="w-full border border-black m-1 p-1">
      <div>
        Baseline:
        <select
          onChange={(e) => {
            const selectedDataSet = data?.find(
              (entry) => entry.name === e.target.value
            );
            setPrimaryDataSet(selectedDataSet);
          }}
        >
          <option></option>
          {data?.map((entry) => (
            <option>{entry.name}</option>
          ))}
        </select>
        Compare: Secondary:
        <select
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
        <select disabled>
          <option>Select Role to filter key attributes</option>
        </select>
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
