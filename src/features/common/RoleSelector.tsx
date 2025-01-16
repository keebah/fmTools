import { Select } from "@radix-ui/themes";

import { roleAttributes } from "../../helpers/roles";
import { Roles, RoleWithKey } from "../../types/role";

export const RoleSelector = ({
  setRole,
}: {
  setRole: React.Dispatch<React.SetStateAction<RoleWithKey | undefined>>;
}) => {
  return (
    <Select.Root
      defaultValue=""
      onValueChange={(value) => {
        const key = value as keyof Roles;
        const role = roleAttributes[key];
        setRole({ key, ...role });
      }}
    >
      <Select.Trigger radius="large" placeholder="Select role" />
      <Select.Content>
        <Select.Item value="none">none</Select.Item>
        {Object.keys(roleAttributes).map((key) => (
          <Select.Item value={key}>{key}</Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
