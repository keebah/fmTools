import { dummyPlayer } from "../../helpers/player";
import { Attributes } from "../../types/player";
import { RowDataType } from "./AttributesTable";

export const filterZeros = (
  hideEmptyColumns: boolean,
  rowData: RowDataType[] | undefined
) => {
  return (item: { field: string }) => {
    if (!rowData) {
      return true;
    }
    if (!hideEmptyColumns) {
      return true;
    }
    const atLeastOneRowHasValue = rowData.some((row) => {
      const thisKey = item.field as keyof Attributes;
      if (!row) {
        return true;
      }
      if (row[thisKey]) {
        return true;
      }
      return false;
    });
    return atLeastOneRowHasValue;
  };
};

export const filterInvalidRows = (row: RowDataType) => {
  if (Number.isNaN(row?.total)) {
    return false;
  }
  return true;
};

export const filterZeroRows = (showChangesOnly: boolean) => {
  return (row: RowDataType) => {
    if (!showChangesOnly) {
      return true;
    }
    const atLeastOneAttributeChanged = Object.keys(dummyPlayer.attributes).some(
      (key) => {
        const thisKey = key as keyof Attributes;
        if (row && row[thisKey]) {
          return true;
        }
        return false;
      }
    );
    if (atLeastOneAttributeChanged) {
      return true;
    }
    return false;
  };
};
