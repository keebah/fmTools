import { useContext, useState } from "react";
import { AppContext } from "./context/AppContext";
import { AttributesPage } from "./features/AttributesPage";
import { DataManager } from "./features/DataManager";
import { PlayerPage } from "./features/PlayerPage";
import { Settings } from "./features/Settings";
import { TacticsPage } from "./features/TacticsPage";
import { cn } from "./features/utils/tailwind";
import "./index.css";
import { Data } from "./types/player";

export interface IIndexDBData {
  data: Data[];
}

const features = {
  Attributes: <AttributesPage />,
  Tactics: <TacticsPage />,
  DataManager: <DataManager />,
  Player: <PlayerPage />,
  Settings: <Settings />,
};

const RenderSwitch = ({ feature }: { feature: string }) => {
  if (Object.keys(features).includes(feature)) {
    return features[feature as keyof typeof features];
  }
  return <></>;
};

function App() {
  const [visibleFeature, setVisibleFeature] = useState<string>("Attributes");
  const { data, setPrimaryDataSet } = useContext(AppContext);
  return (
    <>
      <div className="border border-black bg-gray-50 m-1 w-1/3 text-center text-xl">
        Football Manager Tools
      </div>
      <div className="flex mx-1 px-1 border border-black">
        <div>Primary Data:</div>
        <div>
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
        </div>
        <div className="ml-20"></div>
        {Object.keys(features).map((feature) => (
          <div
            key={feature}
            className={cn(
              "cursor-pointer mx-1 underline",
              visibleFeature === feature && "font-bold"
            )}
            onClick={() => {
              setVisibleFeature(feature);
            }}
          >
            {feature}
          </div>
        ))}
      </div>
      <div className="flex border border-black m-1 p-1">
        <RenderSwitch feature={visibleFeature} />
      </div>
    </>
  );
}

export default App;
