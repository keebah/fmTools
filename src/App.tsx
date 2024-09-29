import { useState } from "react";
import "./App.css";
import { AttributesTable } from "./features/AttributesTable";
import { RoleTable } from "./features/RoleTable";
import { Data, Player } from "./types/player";
import { Importer } from "./features/Importer";

function App() {
  const [data, setDataState] = useState<Data[]>();
  const [primaryDataSet, setPrimaryDataSet] = useState<Data>();
  const [secondaryDataSet, setSecondaryDataSet] = useState<Data>();
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Importer setDataState={setDataState} />
        </div>
        <div className="flex">
          <RoleTable content={primaryDataSet} />
          <RoleTable content={primaryDataSet} />
          <RoleTable content={primaryDataSet} />
        </div>
        <div>
          <div>Existing Data Sets</div>
          <div>1 / 2 / Name</div>
          {data?.map((item) => (
            <div>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    const selectedDataSet = data?.find(
                      (entry) => entry.name === item.name
                    );
                    if (selectedDataSet) {
                      setPrimaryDataSet(selectedDataSet);
                    }
                  }
                }}
                checked={primaryDataSet?.name === item.name}
              />
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    const selectedDataSet = data?.find(
                      (entry) => entry.name === item.name
                    );
                    if (selectedDataSet) {
                      setSecondaryDataSet(selectedDataSet);
                    }
                  }
                }}
                checked={secondaryDataSet?.name === item.name}
              />
              {item.name}
            </div>
          ))}
        </div>
        <AttributesTable
          primaryDataSet={primaryDataSet}
          secondaryDataSet={secondaryDataSet}
        />
      </header>
    </div>
  );
}

export default App;
