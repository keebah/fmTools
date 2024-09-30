import { useEffect, useState } from "react";
import { AttributeView } from "./features/attributes/AtrributeView";
import { Importer } from "./features/Importer";
import { RoleGrid } from "./features/roles/RoleGrid";
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

  const [visibleFeature, setVisibleFeature] = useState("Att");

  const setData = (updateData: (data: Data[]) => Data[]) => {
    setDataState((prev) => {
      const update = updateData(structuredClone(prev || []));
      if (update) {
        saveKeyToObjectStore("data", update);
        return update;
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
            data={data}
            setData={setData}
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
