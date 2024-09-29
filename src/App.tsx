import { useEffect, useState } from "react";
import "./index.css";
import { AttributesTable } from "./features/AttributesTable";
import { DataSelector } from "./features/DataSelector";
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
        <div className="border border-black bg-gray-50">
          <Importer setData={setData} />
        </div>
        <div>
          <DataSelector
            data={data}
            setData={setData}
            primaryDataSet={primaryDataSet}
            setPrimaryDataSet={setPrimaryDataSet}
            secondaryDataSet={secondaryDataSet}
            setSecondaryDataSet={setSecondaryDataSet}
          />
        </div>
        <div className="flex">
          <RoleTable content={primaryDataSet} />
          <RoleTable content={primaryDataSet} />
          <RoleTable content={primaryDataSet} />
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
