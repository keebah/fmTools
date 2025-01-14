import { Button, Flex } from "@radix-ui/themes";
import { useContext, useState } from "react";

import { Input } from "../components/Input";
import { AppContext } from "../context/AppContext";
import { loadData } from "../helpers/loadData";
import { Data } from "../types/player";

export const Importer = () => {
  const [file, setFile] = useState<File>();
  const [name, setName] = useState<string>();
  const { setData } = useContext(AppContext);

  return (
    <>
      <Flex align="center">
        <div className="mr-1">Import Data:</div>
        <div>
          <input
            type="file"
            className="border border-gray-300"
            id="picker"
            onChange={(e) => {
              if (e.target.files?.length) {
                const file = e.target.files[0];
                setFile(file);
              }
            }}
          />
        </div>
      </Flex>
      <Flex align="center">
        <div>Data Set Name:</div>
        <Input type="text" onChange={(e) => setName(e.target.value)} />
        <Button
          disabled={!name || !file}
          onClick={() => {
            if (file && name) {
              const reader = new FileReader();
              reader.readAsText(file, "UTF-8");
              reader.onload = (readerEvent) => {
                const content = readerEvent?.target?.result;
                if (typeof content === "string") {
                  const players = loadData(content);
                  if (name && players) {
                    const newDataSet = { name, players };
                    const updateData = (data: Data[]) => {
                      return [...data, newDataSet];
                    };
                    setData(updateData);
                  }
                }
              };
            }
          }}
        >
          Import
        </Button>
      </Flex>
    </>
  );
};
