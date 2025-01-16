import { Attributes } from "./player";
import { Roles } from "./role";

type RoleAttributeWeights = { [Key in keyof Attributes]: number };

type UserRoleWeights = { [Key in keyof Roles]: RoleAttributeWeights };

export type Settings = {
  decimals: number;
  primaryWeightFM: number;
  secondaryWeightFM: number;
  userRoleWeights: UserRoleWeights;
};
