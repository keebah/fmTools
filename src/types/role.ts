import { Attributes } from "./player";

export type Role = {
  primary: (keyof Attributes)[];
  secondary: (keyof Attributes)[];
  physis: "tor" | "abwehr" | "mittelfeld" | "angriff";
};

export type RoleWithKey = {
  key: keyof Roles;
} & Role;

export type Roles = {
  TWve: Role;
  MTWve: Role;
  MTWun: Role;
  MTWan: Role;
  IVve: Role;
  IVvo: Role;
  IVru: Role;
  BSVve: Role;
  BSVvo: Role;
  BSVru: Role;
  KIVve: Role;
  KIVvo: Role;
  KIVru: Role;
  LIun: Role;
  LIan: Role;
  AVve: Role;
  AVun: Role;
  AVan: Role;
  FVve: Role;
  FVun: Role;
  FVan: Role;
  KIAve: Role;
  KFVun: Role;
  KFVan: Role;
  IAVve: Role;
  IAVun: Role;
  IAVan: Role;
  ABRve: Role;

  AMve: Role;
  AMun: Role;
  AMan: Role;

  ASMun: Role;
  ASMan: Role;

  AZSun: Role;
  AZSan: Role;

  BEMve: Role;
  BEMun: Role;

  BBMun: Role;

  CARun: Role;

  DFLve: Role;
  DFLun: Role;

  DMve: Role;
  DMun: Role;

  ENGun: Role;

  FLGun: Role;
  FLGan: Role;

  IASun: Role;
  IASan: Role;
  IFLun: Role;
  IFLan: Role;
  MEZun: Role;
  MEZan: Role;
  OMun: Role;
  OMan: Role;
  RMDan: Role;
  REGun: Role;
  SNSan: Role;
  VOLun: Role;
  VOLan: Role;
  TSve: Role;
  VESMun: Role;
  VOSMun: Role;
  VOSMan: Role;
  ZMve: Role;
  ZMun: Role;
  ZMan: Role;

  ZSMve: Role;
  ZSMun: Role;
  F9un: Role;
  HASun: Role;
  HASan: Role;
  KNIan: Role;
  KOSun: Role;
  KOSan: Role;
  PSTve: Role;
  PSTun: Role;
  PSTan: Role;
  STSan: Role;
  Tan: Role;
  ZSun: Role;
  ZSan: Role;
};
