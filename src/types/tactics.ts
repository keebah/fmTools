import { Player } from "./player";
import { Role } from "./role";

type TacticSlot = { player?: Player; role?: Role };

export type Tactic = {
  TW?: TacticSlot;
  VR?: TacticSlot;
  VZR?: TacticSlot;
  VZ?: TacticSlot;
  VZL?: TacticSlot;
  VL?: TacticSlot;
  FVR?: TacticSlot;
  DMZR?: TacticSlot;
  DM?: TacticSlot;
  DMZL?: TacticSlot;
  FVL?: TacticSlot;
  MR?: TacticSlot;
  MZR?: TacticSlot;
  MZ?: TacticSlot;
  MZL?: TacticSlot;
  ML?: TacticSlot;
  OMR?: TacticSlot;
  OMZR?: TacticSlot;
  OM?: TacticSlot;
  OMZL?: TacticSlot;
  OML?: TacticSlot;
  STZR?: TacticSlot;
  STZ?: TacticSlot;
  STZL?: TacticSlot;
};
