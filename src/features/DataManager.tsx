import { useContext } from "react";

import { Button } from "../components/Button";
import { AppContext } from "../context/AppContext";
import { Data } from "../types/player";
import { Importer } from "./Importer";

export const DataManager = () => {
  const { data, setData } = useContext(AppContext);
  return (
    <div>
      <Importer />
      <div>Select Data To Display</div>
      <div>1 / 2 / Name</div>
      {data?.map((item) => (
        <div>
          {item.name}
          <Button
            onClick={() => {
              const updateData = (data: Data[]) => {
                return data.filter((entry) => entry.name !== item.name);
              };
              setData(updateData);
            }}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
};
