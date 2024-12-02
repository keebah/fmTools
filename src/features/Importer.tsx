import { useContext, useRef, useState } from "react";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AppContext } from "../context/AppContext";
import { loadData } from "../helpers/loadData";
import { exportDbToJson, importDbFomJson } from "../indexDB";
import { Data } from "../types/player";

export const Importer = () => {
  const [file, setFile] = useState<File>();
  const [name, setName] = useState<string>();
  const { setData } = useContext(AppContext);
  const inputFile = useRef<HTMLInputElement>(null);

  return (
    <div className=" flex p-1 items-center justify-center min-w-[780px]">
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
      <Button
        onClick={() => {
          exportDbToJson();
        }}
      >
        Export Data
      </Button>
      <Button
        onClick={() => {
          inputFile?.current?.click();
        }}
      >
        Import Data
      </Button>{" "}
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
    </div>
  );
};
