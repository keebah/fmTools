import { useEffect, useState } from "react";
import "./App.css";
import { AttributesTable } from "./features/AttributesTable";
import { Importer } from "./features/Importer";
import { RoleTable } from "./features/RoleTable";
import { loadDatabase, saveKeyToObjectStore } from "./indexDB";
import { Data } from "./types/player";

export interface IIndexDBData {
  data: Data[];
}

function App() {
  const [data, setDataState] = useState<Data[]>();
  const [primaryDataSet, setPrimaryDataSet] = useState<Data>();
  const [secondaryDataSet, setSecondaryDataSet] = useState<Data>();

  const setData = (updateData: (data: Data[]) => Data[]) => {
    setDataState((prev) => {
      if (prev) {
        const update = updateData(structuredClone(prev));
        if (update) {
          saveKeyToObjectStore("data", update);
          return update;
        }
      }
      return prev;
    });
  };

  const loadIDB = loadDatabase<IIndexDBData>("data", ["data"]);

  useEffect(() => {
    loadIDB().then((data) => setDataState(data.data));
  }, [loadIDB]);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Importer setData={setData} />
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
              <button
                onClick={() => {
                  const updateData = (data: Data[]) => {
                    return data.filter((entry) => entry.name !== item.name);
                  };
                  setData(updateData);
                }}
              >
                Remove
              </button>
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
