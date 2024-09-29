import { useState } from "react";
import { loadData } from "../helpers/loadData";
import { Data } from "../types/player";

export const Importer = ({
  setDataState,
}: {
  setDataState: React.Dispatch<React.SetStateAction<Data[] | undefined>>;
}) => {
  const [file, setFile] = useState<File>();
  const [name, setName] = useState<string>();

  return (
    <>
      {" "}
      <p>
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
      </p>
      <p>Data Set Name</p>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button
        onClick={() => {
          if (file && name) {
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = (readerEvent) => {
              const content = readerEvent?.target?.result;
              if (typeof content === "string") {
                const players = loadData(content);
                setDataState((prev) => {
                  if (players) {
                    const update = [...(prev || []), { name, players }];
                    return update;
                  }
                  return prev;
                });
              }
            };
          }
        }}
      >
        Import
      </button>
    </>
  );
};
