import { useState } from "react";
import { AttributeView } from "./features/attributes/AtrributeView";
import { DataManager } from "./features/DataManager";
import { RoleGrid } from "./features/roles/RoleGrid";
import { cn } from "./features/utils/tailwind";
import "./index.css";
import { Data } from "./types/player";

export interface IIndexDBData {
  data: Data[];
}

const features = {
  Attributes: <AttributeView />,
  Tactics: <RoleGrid />,
  DataManager: <DataManager />,
};

const RenderSwitch = ({ feature }: { feature: string }) => {
  if (Object.keys(features).includes(feature)) {
    return features[feature as keyof typeof features];
  }
  return <></>;
};

function App() {
  const [visibleFeature, setVisibleFeature] = useState<string>("Attributes");

  return (
    <div>
      <div className="">
        <div className="border border-black bg-gray-50 m-1 w-1/3 text-center text-xl">
          Football Manager Tools
        </div>
      </div>
      <div className="flex mx-1 px-1 border border-black">
        <div>Click to select Feature:</div>
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
      <div className="flex">
        <RenderSwitch feature={visibleFeature} />
      </div>
    </div>
  );
}

export default App;
