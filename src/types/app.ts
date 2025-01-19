import { Attributes } from "./player";
import { Roles } from "./role";

type UserRoleWeights = { [Key in keyof Roles]: Attributes };

export type SettingsType = {
  decimals: number;
  primaryWeightFM: number;
  secondaryWeightFM: number;
  userRoleWeights: UserRoleWeights;
};
