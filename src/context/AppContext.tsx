import { createContext, ReactElement, useEffect, useState } from "react";

import { IIndexDBData } from "../App";
import {
  loadDatabase,
  saveKeyToObjectStore,
  saveObjectToObjectStore,
} from "../indexDB";
import { Settings } from "../types/app";
import { Data } from "../types/player";
import { defaultSettings } from "./defaultSettings";

export type AppContextType = {
  data: Data[] | undefined;
  setData: (updateData: (data: Data[]) => Data[]) => void;
  primaryDataSet: Data | undefined;
  setPrimaryDataSet: React.Dispatch<React.SetStateAction<Data | undefined>>;
  secondaryDataSet: Data | undefined;
  setSecondaryDataSet: React.Dispatch<React.SetStateAction<Data | undefined>>;
  settings: Settings;
  setSettings: (changes: Partial<Settings>) => void;
};

export const AppContext = createContext<AppContextType>({
  data: undefined,
  setData: () => {},
  primaryDataSet: undefined,
  setPrimaryDataSet: () => {},
  secondaryDataSet: undefined,
  setSecondaryDataSet: () => {},
  settings: defaultSettings,
  setSettings: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [data, setDataState] = useState<Data[]>();
  const [primaryDataSet, setPrimaryDataSet] = useState<Data>();
  const [secondaryDataSet, setSecondaryDataSet] = useState<Data>();
  const [settings, setSettingsState] = useState<Settings>(defaultSettings);
  const setData = (updateData: (data: Data[]) => Data[]) => {
    setDataState((prev) => {
      const update = updateData(structuredClone(prev || []));
      if (update) {
        saveKeyToObjectStore("data", update);
        return update;
      }
      return prev;
    });
  };
  const setSettings = (changes: Partial<Settings>) => {
    setSettingsState((prev) => {
      console.log(prev, changes);
      const update = { ...prev, ...changes };
      if (update) {
        console.log(prev, changes);

        saveObjectToObjectStore("settings", update);
        return update;
      }
      return prev;
    });
  };
  // load index db cache
  const loadIDB = loadDatabase<IIndexDBData>("data", ["data"]);
  useEffect(() => {
    loadIDB().then((data) => setDataState(data.data));
  }, []);

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        primaryDataSet,
        setPrimaryDataSet,
        secondaryDataSet,
        setSecondaryDataSet,
        settings,
        setSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
