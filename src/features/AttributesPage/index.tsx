import { Card, Checkbox, Flex, Separator, Text } from "@radix-ui/themes";
import { useContext, useState } from "react";

import { AppContext } from "../../context/AppContext";
import { RoleWithKey } from "../../types/role";
import { RoleSelector } from "../common/RoleSelector";
import { AttributesTable } from "./AttributesTable";
import { ComparisonDataSelectBox } from "./ComparsionDataSelectBox";

export const AttributesPage = () => {
  const [showChangesOnly, setShowChangesOnly] = useState(false);
  const [hideEmptyColumns, setHideEmptyColumns] = useState(false);

  const [role, setRole] = useState<RoleWithKey | undefined>(undefined);

  const { primaryDataSet, secondaryDataSet } = useContext(AppContext);
  return (
    <div className="w-full">
      <Card>
        <Flex gap="3" align="center">
          <ComparisonDataSelectBox />
          <Separator orientation="vertical" />
          <Text as="label" size="2">
            <Flex gap="1">
              <Checkbox
                defaultChecked={showChangesOnly}
                disabled={!secondaryDataSet}
                onClick={() => {
                  setShowChangesOnly(!showChangesOnly);
                }}
              />
              Changes Only (+ primary &gt; secondary)
            </Flex>
          </Text>
          <Separator orientation="vertical" />
          <Text as="label" size="2">
            <Flex gap="1">
              <Checkbox
                defaultChecked={hideEmptyColumns}
                onClick={() => {
                  setHideEmptyColumns(!hideEmptyColumns);
                }}
              />
              Hide empty columns
            </Flex>
          </Text>
          <Separator orientation="vertical" />
          <Flex gap="1" align="center">
            <Text as="label" size="2">
              Role Filter:
            </Text>
            <RoleSelector setRole={setRole} />
          </Flex>
        </Flex>
      </Card>
      <Card>
        <AttributesTable
          hideEmptyColumns={hideEmptyColumns}
          primaryDataSet={primaryDataSet}
          roleFilter={role}
          secondaryDataSet={secondaryDataSet}
          showChangesOnly={showChangesOnly}
        />
      </Card>
    </div>
  );
};
