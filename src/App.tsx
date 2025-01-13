import { Box, Card, Flex, Heading, Tabs } from "@radix-ui/themes";
import { useContext } from "react";

import { AppContext } from "./context/AppContext";
import { AttributesPage } from "./features/AttributesPage";
import { DataManager } from "./features/DataManager";
import { Settings } from "./features/Settings";
import { TacticsPage } from "./features/TacticsPage";
import "./index.css";
import { Data } from "./types/player";

export interface IIndexDBData {
  data: Data[];
}

function App() {
  const { data, setPrimaryDataSet } = useContext(AppContext);
  return (
    <Flex gap="2" direction="column">
      <Card>
        <Heading align="center">Football Manager Tools</Heading>
      </Card>
      <Card>
        <Flex gap="3" align="center">
          <div>Primary Data:</div>
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
        </Flex>
      </Card>
      <Card>
        <Tabs.Root defaultValue="account">
          <Tabs.List>
            <Tabs.Trigger value="attributes">Attributes</Tabs.Trigger>
            <Tabs.Trigger value="tactics">Tactics</Tabs.Trigger>
            <Tabs.Trigger value="dataManager">Data Manager</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <Box pt="3">
            <Tabs.Content value="attributes">
              <AttributesPage />
            </Tabs.Content>
            <Tabs.Content value="tactics">
              <TacticsPage />
            </Tabs.Content>
            <Tabs.Content value="dataManager">
              <DataManager />
            </Tabs.Content>{" "}
            <Tabs.Content value="settings">
              <Settings />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Card>
    </Flex>
  );
}

export default App;
