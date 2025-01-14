import { Select } from "@radix-ui/themes";

import { roleAttributes } from "../../helpers/roles";
import { Role, Roles } from "../../types/role";

export const RoleSelector = ({
  setRole,
}: {
  setRole: React.Dispatch<React.SetStateAction<Role | undefined>>;
}) => {
  return (
    <Select.Root
      defaultValue=""
      onValueChange={(value) => {
        const stuff = roleAttributes[value as keyof Roles];
        setRole(stuff);
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
