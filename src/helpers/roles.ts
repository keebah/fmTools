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

export const calculateRoleScore = (player: Player, role: Role) => {
  const attributes = player.attributes;
  const physis = player.physis;

  const sumPrimary = role.primary.reduce(
    (total: number, value: keyof Attributes) => {
      const attValue = attributes[value];
      if (player && player.attributes) {
        return total + (attValue || 0);
      }
      return total;
    },
    0
  );
  const sumSecondary = role.secondary.reduce((total, value) => {
    if (player && player.attributes) {
      return total + (attributes[value] || 0);
    }
    return total;
  }, 0);
  const primaryScore = sumPrimary / role.primary.length;
  const secondaryScore = sumSecondary / role.secondary.length;
  const physisScore = physis[role.physis];
  const totalScore =
    (primaryScore * 1.5 + secondaryScore * 1 + physisScore * 1) / 3.5;

  return { primaryScore, secondaryScore, totalScore };
};
