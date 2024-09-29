import { Data } from "../types/player";

export const DataSelector = ({
  data,
  setData,
  primaryDataSet,
  setPrimaryDataSet,
  secondaryDataSet,
  setSecondaryDataSet,
}: {
  data: Data[] | undefined;
  setData: (updateData: (data: Data[]) => Data[]) => void;
  primaryDataSet: Data | undefined;
  setPrimaryDataSet: React.Dispatch<React.SetStateAction<Data | undefined>>;
  secondaryDataSet: Data | undefined;
  setSecondaryDataSet: React.Dispatch<React.SetStateAction<Data | undefined>>;
}) => {
  return (
    <>
      <div>Existing Data Sets</div>
      <div>1 / 2 / Name</div>
      {data?.map((item) => (
        <div>
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                const selectedDataSet = data?.find(
                  (entry) => entry.name === item.name
                );
                if (selectedDataSet) {
                  setPrimaryDataSet(selectedDataSet);
                }
              }
            }}
            checked={primaryDataSet?.name === item.name}
          />
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                const selectedDataSet = data?.find(
                  (entry) => entry.name === item.name
                );
                if (selectedDataSet) {
                  setSecondaryDataSet(selectedDataSet);
                }
              }
            }}
            checked={secondaryDataSet?.name === item.name}
          />
          {item.name}
          <button
            onClick={() => {
              const updateData = (data: Data[]) => {
                return data.filter((entry) => entry.name !== item.name);
              };
              setData(updateData);
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </>
  );
};
