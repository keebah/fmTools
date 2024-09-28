import { useState } from "react";
import "./App.css";
import { AttributesTable } from "./features/AttributesTable";
import { RoleTable } from "./features/RoleTable";
import { loadData } from "./helpers/loadData";
import { Player } from "./types/player";

function App() {
  const [fileContent, setFileContent] = useState<Player[] | undefined>();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <input
            type="file"
            className="border border-gray-300"
            id="picker"
            onChange={(e) => {
              if (e.target.files?.length) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsText(file, "UTF-8");
                reader.onload = (readerEvent) => {
                  const content = readerEvent?.target?.result;
                  if (typeof content === "string") {
                    const superData = loadData(content);
                    console.log(superData);
                    setFileContent(superData);
                  }
                };
              }
            }}
          />
        </p>
        <RoleTable content={fileContent} />
        <AttributesTable content={fileContent} />
      </header>
    </div>
  );
}

export default App;
