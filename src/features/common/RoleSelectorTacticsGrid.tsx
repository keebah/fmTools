import { Select } from "@radix-ui/themes";

import { roleAttributes } from "../../helpers/roles";
import { Roles, RoleWithKey } from "../../types/role";

export const RoleSelectorTacticsGrid = ({
  availableRoles,
  onValueChange,
}: {
  availableRoles?: Partial<Roles>;
  onValueChange: (value: string) => void;
}) => {
  const allowedRoles = availableRoles ?? roleAttributes;
  return (
    <Select.Root defaultValue="" onValueChange={onValueChange}>
      <Select.Trigger radius="large" placeholder="Select role" />
      <Select.Content>
        <Select.Item value="none">none</Select.Item>
        {Object.keys(allowedRoles).map((key) => (
          <Select.Item value={key}>{key}</Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
