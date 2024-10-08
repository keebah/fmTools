import { Role } from "../../types/role";

const ASMun: Role = {
  primary: [
    "Ballannahme",
    "Passen",
    "Technik",
    "Entscheidungen",
    "Nervenstaerke",
    "Teamwork",
    "Uebersicht",
  ],
  secondary: ["OhneBall", "Beweglichkeit"],
  physis: "mittelfeld",
};

const ASMan: Role = {
  primary: [
    "Ballannahme",
    "Dribbling",
    "Passen",
    "Technik",
    "Entscheidungen",
    "Nervenstaerke",
    "OhneBall",
    "Teamwork",
    "Uebersicht",
  ],
  secondary: ["Antizipation", "Flair", "Antritt", "Beweglichkeit"],
  physis: "mittelfeld",
};

export const ASM = {
  ASMun,
  ASMan,
};
