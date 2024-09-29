import { useEffect, useState } from "react";
import { AttributeView } from "./features/AtrributeView";
import { Importer } from "./features/Importer";
import { RoleTable } from "./features/RoleTable";
import "./index.css";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="border border-black bg-gray-50 m-1">
        <Importer setData={setData} />
      </div>
      <div>Feature select</div>
      <div className="flex">
        <AttributeView
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
    </div>
  );
}

export default App;
