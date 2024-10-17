import { Role } from "../../types/role";

const FLGun: Role = {
  primary: ["Flanken", "Technik", "OhneBall", "Antritt", "Schnelligkeit"],
  secondary: [
    "Ballannahme",
    "Dribbling",
    "Passen",
    "Einsatzfreude",
    "Ausdauer",
    "Beweglichkeit",
  ],
  physis: "mittelfeld",
};

const FLGan: Role = {
  primary: [
    "Dribbling",
    "Flanken",
    "Technik",
    "OhneBall",
    "Antritt",
    "Beweglichkeit",
    "Schnelligkeit",
  ],
  secondary: [
    "Ballannahme",
    "Passen",
    "Antizipation",
    "Einsatzfreude",
    "Flair",
    "Ausdauer",
  ],
  physis: "mittelfeld",
};

export const FLG = {
  FLGun,
  FLGan,
};
