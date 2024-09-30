import { Button } from "../../components/Button";
import { Data } from "../../types/player";

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
    <div>
      <div>Select Data To Display</div>
      <div>1 / 2 / Name</div>
      {data?.map((item) => (
        <div className="flex gap-1">
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
                } else {
                  if (primaryDataSet?.name === item.name) {
                    setPrimaryDataSet(undefined);
                  }
                }
              }}
              checked={primaryDataSet?.name === item.name}
            />
          </div>
          <div>
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
                } else {
                  if (secondaryDataSet?.name === item.name) {
                    setSecondaryDataSet(undefined);
                  }
                }
              }}
              checked={secondaryDataSet?.name === item.name}
            />
          </div>
          <div>{item.name}</div>
          <div>
            <Button
              onClick={() => {
                const updateData = (data: Data[]) => {
                  return data.filter((entry) => entry.name !== item.name);
                };
                setData(updateData);
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
