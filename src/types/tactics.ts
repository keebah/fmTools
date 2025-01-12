import { Player } from "./player";
import { RoleWithKey } from "./role";

type TacticSlot = { player?: Player; role?: RoleWithKey };
export type TacticPlayers = {
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
export type Tactic = {
  players?: TacticPlayers;
  scores: { primaryScore: number; secondaryScore: number; totalScore: number };
};
