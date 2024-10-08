import { Role } from "../../types/role";

const AVve: Role = {
  primary: [
    "Deckung",
    "Tackling",
    "Antizipation",
    "Konzentration",
    "Stellungsspiel",
  ],
  secondary: [
    "Flanken",
    "Passen",
    "Entscheidungen",
    "Nervenstaerke",
    "Teamwork",
    "Ausdauer",
    "Schnelligkeit",
  ],
  physis: "abwehr",
};
const AVun: Role = {
  primary: [
    "Deckung",
    "Tackling",
    "Antizipation",
    "Einsatzfreude",
    "Konzentration",
    "Stellungsspiel",
    "Teamwork",
  ],
  secondary: [
    "Dribbling",
    "Flanken",
    "Passen",
    "Technik",
    "Entscheidungen",
    "Nervenstaerke",
    "Ausdauer",
    "Schnelligkeit",
  ],
  physis: "abwehr",
};

const AVan: Role = {
  primary: [
    "Flanken",
    "Tackling",
    "Antizipation",
    "Einsatzfreude",
    "Stellungsspiel",
    "Teamwork",
    "Ausdauer",
    "Schnelligkeit",
  ],
  secondary: [
    "Ballannahme",
    "Deckung",
    "Dribbling",
    "Passen",
    "Technik",
    "Entscheidungen",
    "Konzentration",
    "Nervenstaerke",
    "OhneBall",
    "Antritt",
    "Beweglichkeit",
  ],
  physis: "abwehr",
};

export const AV = {
  AVve,
  AVun,
  AVan,
};
