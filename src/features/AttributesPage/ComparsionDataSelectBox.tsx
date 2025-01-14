import { Flex, Select, Text } from "@radix-ui/themes";
import { useContext } from "react";

import { AppContext } from "../../context/AppContext";

export const ComparisonDataSelectBox = () => {
  const { data, secondaryDataSet, setSecondaryDataSet } =
    useContext(AppContext);
  return (
    <Flex gap="1" align="center">
      <Text as="label" size="2">
        Select Compare Set:{" "}
      </Text>
      <Select.Root
        defaultValue={secondaryDataSet?.name}
        onValueChange={(value) => {
          const selectedDataSet = data?.find((entry) => entry.name === value);
          setSecondaryDataSet(selectedDataSet);
        }}
      >
        <Select.Trigger radius="large" placeholder="none" />
        <Select.Content>
          <Select.Item value="none">none</Select.Item>
          {data?.map((entry) => (
            <Select.Item value={entry.name}>{entry.name}</Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};
