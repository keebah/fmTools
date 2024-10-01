import { useState } from "react";
import { AttributeView } from "./features/attributes/AtrributeView";
import { Importer } from "./features/Importer";
import { RoleGrid } from "./features/roles/RoleGrid";
import "./index.css";
import { Data } from "./types/player";

export interface IIndexDBData {
  data: Data[];
}

function App() {
  const [primaryDataSet, setPrimaryDataSet] = useState<Data>();
  const [secondaryDataSet, setSecondaryDataSet] = useState<Data>();

  const [visibleFeature, setVisibleFeature] = useState("Att");

  return (
    <div>
      <div className="border border-black bg-gray-50 m-1">
        <Importer />
      </div>
      <div>
        <select
          onChange={(e) => {
            setVisibleFeature(e.target.value);
          }}
        >
          <option>Select Feature</option>
          <option>Att</option>
          <option>Role</option>
        </select>
      </div>
      {visibleFeature === "Att" && (
        <div className="flex">
          <AttributeView
            primaryDataSet={primaryDataSet}
            setPrimaryDataSet={setPrimaryDataSet}
            secondaryDataSet={secondaryDataSet}
            setSecondaryDataSet={setSecondaryDataSet}
          />
        </div>
      )}
      {visibleFeature === "Role" && (
        <div className="flex">
          <RoleGrid primaryDataSet={primaryDataSet} />
        </div>
      )}
    </div>
  );
}

export default App;
