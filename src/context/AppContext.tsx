import { createContext, ReactElement, useEffect, useState } from "react";
import { loadDatabase, saveKeyToObjectStore } from "../indexDB";
import { Data } from "../types/player";
import { IIndexDBData } from "../App";

export type AppContextType = {
  data: Data[] | undefined;
  setData: (updateData: (data: Data[]) => Data[]) => void;
};

export const AppContext = createContext<AppContextType>({
  data: undefined,
  setData: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [data, setDataState] = useState<Data[]>();

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
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
};
