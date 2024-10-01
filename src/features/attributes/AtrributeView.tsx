import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Data } from "../../types/player";
import { AttributesTable } from "./AttributesTable";
import { DataSelector } from "./DataSelector";

export const AttributeView = ({
  primaryDataSet,
  setPrimaryDataSet,
  secondaryDataSet,
  setSecondaryDataSet,
}: {
  primaryDataSet: Data | undefined;
  setPrimaryDataSet: React.Dispatch<React.SetStateAction<Data | undefined>>;
  secondaryDataSet: Data | undefined;
  setSecondaryDataSet: React.Dispatch<React.SetStateAction<Data | undefined>>;
}) => {
  const [showChangesOnly, setShowChangesOnly] = useState(false);
  const { data, setData } = useContext(AppContext);

  return (
    <>
      <div className="w-1/6 border border-black p-1 m-1">
        <DataSelector
          data={data}
          setData={setData}
          primaryDataSet={primaryDataSet}
          setPrimaryDataSet={setPrimaryDataSet}
          secondaryDataSet={secondaryDataSet}
          setSecondaryDataSet={setSecondaryDataSet}
        />
        <input
          type="checkbox"
          onChange={(e) => {
            setShowChangesOnly(!showChangesOnly);
          }}
          checked={showChangesOnly}
        />
        Show Changes Only
      </div>
      <div className="w-full border border-black m-1 p-1">
        <AttributesTable
          primaryDataSet={primaryDataSet}
          secondaryDataSet={secondaryDataSet}
          showChangesOnly={showChangesOnly}
        />
      </div>
    </>
  );
};
