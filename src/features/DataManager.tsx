import { Button, Card, DataList, Flex } from "@radix-ui/themes";
import { Header } from "@radix-ui/themes/dist/cjs/components/table";
import { useContext, useRef } from "react";

import { AppContext } from "../context/AppContext";
import { exportDbToJson, importDbFomJson } from "../indexDB";
import { Data } from "../types/player";
import { Importer } from "./Importer";

export const DataManager = () => {
  const { data, setData } = useContext(AppContext);
  const inputFile = useRef<HTMLInputElement>(null);

  return (
    <Flex direction="row">
      <Card>
        Import text file from football manager:
        <Importer />
      </Card>
      <Card>
        Import / Export all tool data:
        <Flex gap="2">
          <Button
            onClick={() => {
              exportDbToJson();
            }}
          >
            Export Database
          </Button>
          <Button
            onClick={() => {
              inputFile?.current?.click();
            }}
          >
            Import Database
          </Button>
        </Flex>
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={() => {
            if (!inputFile?.current?.files?.length) return;
            const file = inputFile?.current?.files[0];
            if (file) {
              const reader = new FileReader();
              reader.addEventListener("load", (readerEvent) => {
                const content = readerEvent?.target?.result;
                if (content instanceof ArrayBuffer) {
                  importDbFomJson(content);
                }
              });
              reader.readAsArrayBuffer(file);
            }
            inputFile.current.value = "";
          }}
        />
      </Card>
      <Card>
        <Header>Existing data sets:</Header>
        <DataList.Root>
          {data?.map((item) => (
            <DataList.Item align="center">
              <DataList.Label>{item.name}</DataList.Label>
              <DataList.Value>
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
              </DataList.Value>
            </DataList.Item>
          ))}
        </DataList.Root>
      </Card>
    </Flex>
  );
};
