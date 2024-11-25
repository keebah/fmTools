import { roleAttributes } from "../../helpers/roles";
import { Role, Roles } from "../../types/role";

export const RoleSelector = ({
  setRole,
}: {
  setRole: React.Dispatch<React.SetStateAction<Role | undefined>>;
}) => {
  return (
    <select
      onChange={(e) => {
        const stuff = roleAttributes[e.target.value as keyof Roles];
        setRole(stuff);
      }}
    >
      <option></option>
      {Object.keys(roleAttributes).map((key) => (
        <option key={key}>{key}</option>
      ))}
    </select>
  );
};
