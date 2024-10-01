import { useState } from "react";
import { AttributeView } from "./features/attributes/AtrributeView";
import { Importer } from "./features/Importer";
import { RoleGrid } from "./features/roles/RoleGrid";
import "./index.css";
import { Data } from "./types/player";
import { cn } from "./features/utils/tailwind";

export interface IIndexDBData {
  data: Data[];
}

type Feature = "Attributes" | "Tactics";
const RenderSwitch = ({ feature }: { feature: Feature }) => {
  switch (feature) {
    case "Attributes":
      return <AttributeView />;
    case "Tactics":
      return <RoleGrid />;
    default:
      return <></>;
  }
};

function App() {
  const [visibleFeature, setVisibleFeature] = useState<Feature>("Attributes");

  const features: Feature[] = ["Attributes", "Tactics"];
  return (
    <div>
      <div className="border border-black bg-gray-50 m-1">
        <Importer />
      </div>
      <div className="flex mx-1 px-1 border border-black">
        <div>Click to select Feature:</div>
        {features.map((feature) => (
          <div
            key={feature}
            className={cn(
              "cursor-pointer mx-1",
              visibleFeature === feature && "underline"
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
