import { openDB } from "idb";

// we could have a version number generated?
const idbVersion = 1;

// register every object store we want to save here; add new things here
export const ObjectStores = {
  data: "data",
};

export type AvailableObjectStoresType = keyof typeof ObjectStores;

// open the index DB and upgrade if we need a new version
// no top level await so will return a promise here
export const orhIdb = openDB("fmTools", idbVersion, {
  upgrade(db) {
    for (const store of Object.keys(ObjectStores)) {
      if (!db.objectStoreNames.contains(store)) {
        db.createObjectStore(store);
      }
    }
  },
});

// function to be used with individual keys
export const loadDatabase = <IIndexDBData extends object>(
  objectStore: AvailableObjectStoresType,
  requestKeys: Extract<keyof IIndexDBData, string>[]
) => {
  return async () => {
    const db = await orhIdb;
    const promiseArray = requestKeys.map((key) =>
      db.get(objectStore, key).then((value) => {
        return { key: key, value };
      })
    );
    const loadedData = await Promise.all(promiseArray);
    const output = loadedData.reduce((obj, item) => {
      return { ...obj, ...{ [item.key]: item.value } };
    }, {});

    return output as IIndexDBData;
  };
};

// function to get the full data from the store, as indexDB is performance limited
// when opening a lot of transactions it might be better to get all data in a
// single transaction
export const loadFullObjectStore = <IIndexDBData extends object>(
  objectStore: AvailableObjectStoresType
) => {
  return async () => {
    const output = orhIdb.then((db) =>
      db
        .getAllKeys(objectStore)
        .then((keyArray) =>
          db
            .getAll(objectStore)
            .then((data) =>
              Object.fromEntries(
                keyArray.map((key, index) => [key, data[index]])
              )
            )
        )
    );
    return output as IIndexDBData;
  };
};

// If this now could somehow tell me that I am not allowed certain things...
export const saveKeyToObjectStore = async <IIndexDBData extends object>(
  objectStore: keyof typeof ObjectStores,
  data: Partial<IIndexDBData>
) => {
  try {
    const db = await orhIdb;
    await db.put(objectStore, data, "data");
  } catch (err) {
    console.error("Error saving to IndexDB: ", err);
  }
};
