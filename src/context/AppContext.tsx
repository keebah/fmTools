import { createContext, ReactElement, useEffect, useState } from "react";
import { loadDatabase, saveKeyToObjectStore } from "../indexDB";
import { Data } from "../types/player";
import { IIndexDBData } from "../App";
import { Settings } from "../types/app";

export type AppContextType = {
  data: Data[] | undefined;
  setData: (updateData: (data: Data[]) => Data[]) => void;
  primaryDataSet: Data | undefined;
  setPrimaryDataSet: React.Dispatch<React.SetStateAction<Data | undefined>>;
  secondaryDataSet: Data | undefined;
  setSecondaryDataSet: React.Dispatch<React.SetStateAction<Data | undefined>>;
  settings: Settings;
};

export const AppContext = createContext<AppContextType>({
  data: undefined,
  setData: () => {},
  primaryDataSet: undefined,
  setPrimaryDataSet: () => {},
  secondaryDataSet: undefined,
  setSecondaryDataSet: () => {},
  settings: { decimals: 1 },
});

export const AppContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [data, setDataState] = useState<Data[]>();
  const [primaryDataSet, setPrimaryDataSet] = useState<Data>();
  const [secondaryDataSet, setSecondaryDataSet] = useState<Data>();
  const [settings] = useState<Settings>({ decimals: 1 });
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

  // load index db cache
  const loadIDB = loadDatabase<IIndexDBData>("data", ["data"]);
  useEffect(() => {
    loadIDB().then((data) => setDataState(data.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
