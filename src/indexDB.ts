import { openDB } from "idb";

// we could have a version number generated?
const idbVersion = 2;

// register every object store we want to save here; add new things here
export const ObjectStores = {
  data: "data",
  settings: "settings",
};

export type AvailableObjectStoresType = keyof typeof ObjectStores;

// open the index DB and upgrade if we need a new version
// no top level await so will return a promise here
export const indexDb = openDB("fmTools", idbVersion, {
  upgrade(db) {
    for (const store of Object.keys(ObjectStores)) {
      if (!db.objectStoreNames.contains(store)) {
        db.createObjectStore(store);
      }
    }
  },
});

export const loadFullDatabase = <IIndexDBData extends object>() => {
  return async () => {
    const db = await indexDb;
    const promiseArray = Object.keys(ObjectStores).map(async (storeName) => {
      const keys = await db.getAllKeys(storeName);
      const data = await db.getAll(storeName);
      const returnArray = keys.map((item, index) => [item, data[index]]);
      return [[storeName], Object.fromEntries(returnArray)];
    });
    const loadedData = await Promise.all(promiseArray);
    return Object.fromEntries(loadedData) as IIndexDBData;
  };
};

// used to save an object to the idb. The individual keys of the object should
// be converted to records
export const saveObjectToObjectStore = async <IIndexDBData extends object>(
  objectStore: keyof typeof ObjectStores,
  data: Partial<IIndexDBData>
) => {
  try {
    const db = await indexDb;
    Object.entries(data).forEach(async ([key, value]) => {
      await db.put(objectStore, value, key);
    });
  } catch (err) {
    console.error("Error saving to IndexDB: ", err);
  }
};

// If this now could somehow tell me that I am not allowed certain things...
export const saveKeyToObjectStore = async <IIndexDBData extends object>(
  objectStore: keyof typeof ObjectStores,
  data: Partial<IIndexDBData>
) => {
  try {
    const db = await indexDb;
    await db.put(objectStore, data, "data");
  } catch (err) {
    console.error("Error saving to IndexDB: ", err);
  }
};

export const exportDbToJson = async (filename?: string) => {
  const db = await indexDb;
  const promiseArray = Object.entries(ObjectStores).map(
    async ([key, value]) => {
      const childKeys = await db.getAllKeys(value);
      const data = await db.getAll(value);
      const returnArray = childKeys.map((item, index) => [item, data[index]]);
      return [[key], Object.fromEntries(returnArray)];
    }
  );

  const loadedData = await Promise.all(promiseArray);
  const a = document.createElement("a");
  const file = new Blob([
    JSON.stringify({
      ...Object.fromEntries(loadedData),
    }),
  ]);
  a.href = URL.createObjectURL(file);
  a.download = `${filename ?? "fmtools"}.json`;
  a.click();
};

export const importDbFomJson = async (content: ArrayBuffer) => {
  const a = JSON.parse(new TextDecoder().decode(content));
  const db = await indexDb;

  Object.entries(a).forEach(async ([objectStoreKey, value]) => {
    if (Object.keys(ObjectStores).includes(objectStoreKey) && value) {
      Object.entries(value).forEach(async ([key, value]) => {
        await db.put(objectStoreKey, value, key);
      });
    }
  });
};
