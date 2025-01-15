import { Attributes, Player } from "../types/player";
import { Role, Roles } from "../types/role";
import { ABR } from "./roles/abr";
import { AM } from "./roles/am";
import { ASM } from "./roles/asm";
import { AV } from "./roles/av";
import { AZS } from "./roles/azs";
import { BBM } from "./roles/bbm";
import { BEM } from "./roles/bem";
import { BSV } from "./roles/bsv";
import { CAR } from "./roles/car";
import { DFL } from "./roles/dfl";
import { DM } from "./roles/dm";
import { ENG } from "./roles/eng";
import { F9 } from "./roles/f9";
import { FLG } from "./roles/flg";
import { FV } from "./roles/fv";
import { HAS } from "./roles/has";
import { IAS } from "./roles/ias";
import { IAV } from "./roles/iav";
import { IFL } from "./roles/ifl";
import { IV } from "./roles/iv";
import { KFV } from "./roles/kfv";
import { KIA } from "./roles/kia";
import { KIV } from "./roles/kiv";
import { KNI } from "./roles/kni";
import { KOS } from "./roles/kos";
import { LI } from "./roles/li";
import { MEZ } from "./roles/mez";
import { OM } from "./roles/om";
import { PST } from "./roles/pst";
import { REG } from "./roles/reg";
import { RMD } from "./roles/rmd";
import { SNS } from "./roles/sns";
import { STS } from "./roles/sts";
import { T } from "./roles/t";
import { TS } from "./roles/ts";
import { TW } from "./roles/tw";
import { VESM } from "./roles/vesm";
import { VOL } from "./roles/vol";
import { VOSM } from "./roles/vosm";
import { ZM } from "./roles/zm";
import { ZS } from "./roles/zs";
import { ZSM } from "./roles/zsm";

export const keeperGroup = TW;

export const attackGroup = {
  ...F9,
  ...HAS,
  ...KNI,
  ...KOS,
  ...PST,
  ...STS,
  ...T,
  ...ZS,
};

// offensive midfield outside
export const omaGroup = {
  ...FLG,
  ...VOSM,
  ...IAS,
  ...T,
  ...AZS,
  ...RMD,
};

// offensive midfield central
export const omcGroup = { ...OM, ...VOSM, ...T, ...ENG, ...SNS };

// central midfield outside
export const maGroup = { ...AM, ...FLG, ...DFL, ...ASM, ...IFL };

//central midfield central
export const mGroup = {
  ...ZM,
  ...ZSM,
  ...BBM,
  ...VOSM,
  ...BEM,
  ...VESM,
};

export const mzGroup = {
  ...mGroup,
  ...MEZ,
  ...CAR,
};

// defensive midfield outside
export const fvaGroup = { ...FV, ...KFV, ...IAV };

/// defensive midfield central
export const dmGroup = {
  ...DM,
  ...ZSM,
  ...BEM,
  ...ABR,
  ...TS,
  ...REG,
  ...VESM,
};

// defensive midfield inside
export const dmzGroup = { ...dmGroup, ...VOL };

// defender outside
export const vaGroup = { ...AV, ...FV, ...KIA, ...KFV, ...IAV };

// defender inside
export const vzGroup = { ...IV, ...BSV, ...KIV };

// defender center
export const vGroup = { ...vzGroup, ...LI };

export const midfieldGroup = {
  ...omaGroup,
  ...omcGroup,
  ...maGroup,
  ...mGroup,
  ...mzGroup,
  ...fvaGroup,
  ...dmGroup,
  ...dmzGroup,
};

export const defenseGroup = { ...vaGroup, ...vzGroup, ...vGroup };
export const roleAttributes: Roles = {
  ...ABR,
  ...AM,
  ...ASM,
  ...AV,
  ...AZS,
  ...BBM,
  ...BEM,
  ...BSV,
  ...CAR,
  ...DFL,
  ...DM,
  ...ENG,
  ...F9,
  ...FLG,
  ...FV,
  ...HAS,
  ...IAS,
  ...IAV,
  ...IFL,
  ...IV,
  ...KFV,
  ...KIA,
  ...KIV,
  ...KNI,
  ...KOS,
  ...LI,
  ...MEZ,
  ...OM,
  ...PST,
  ...REG,
  ...RMD,
  ...SNS,
  ...STS,
  ...T,
  ...TS,
  ...TW,
  ...VESM,
  ...VOL,
  ...VOSM,
  ...ZM,
  ...ZS,
  ...ZSM,
};

export const calculateRoleAttributeScore = (
  attributes: Attributes,
  roleAttributes: (keyof Attributes)[]
) => {
  if (!attributes) {
    return NaN;
  }
  const sumScores = roleAttributes.reduce((total: number, value) => {
    const attValue = attributes[value] || NaN;
    return total + (attValue || 0);
  }, 0);
  return sumScores / roleAttributes.length;
};

export const calculateTotalRoleAttributeScore = (
  attributes: Attributes,
  role: Role
) => {
  const primaryScore = calculateRoleAttributeScore(attributes, role.primary);
  const secondaryScore = calculateRoleAttributeScore(
    attributes,
    role.secondary
  );
  return (primaryScore * 2 + secondaryScore * 1) / 3;
};

export const calculateFMRoleScore = (
  player: Player,
  role: Role,
  weights: { primaryWeightFM: number; secondaryWeightFM: number }
) => {
  const attributes = player.attributes;
  const primaryScore = calculateRoleAttributeScore(attributes, role.primary);
  const secondaryScore = calculateRoleAttributeScore(
    attributes,
    role.secondary
  );
  const totalScore =
    (primaryScore * weights.primaryWeightFM +
      secondaryScore * weights.secondaryWeightFM) /
    (weights.primaryWeightFM + weights.secondaryWeightFM);
  return { primaryScore, secondaryScore, totalScore };
};

export const calculateRoleScore = (player: Player, role: Role) => {
  const attributes = player.attributes;
  const physis = player.physis;

  const primaryScore = calculateRoleAttributeScore(attributes, role.primary);
  const secondaryScore = calculateRoleAttributeScore(
    attributes,
    role.secondary
  );
  const physisScore = physis[role.physis];
  const totalScore =
    (primaryScore * 2 + secondaryScore * 1 + physisScore * 1) / 4;

  return { primaryScore, secondaryScore, totalScore };
};
