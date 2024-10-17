import { Role } from "../../types/role";

const IAVve: Role = {
  primary: [
    "Deckung",
    "Tackling",
    "Einsatzfreude",
    "Entscheidungen",
    "Stellungsspiel",
    "Antritt",
  ],
  secondary: [
    "Passen",
    "Antizipation",
    "Konzentration",
    "Ausdauer",
    "Schnelligkeit",
  ],
  physis: "abwehr",
};
const IAVun: Role = {
  primary: [
    "Deckung",
    "Passen",
    "Tackling",
    "Einsatzfreude",
    "Entscheidungen",
    "Stellungsspiel",
    "Ausdauer",
  ],
  secondary: [
    "Ballannahme",
    "Dribbling",
    "Technik",
    "Antizipation",
    "Konzentration",
    "Nervenstaerke",
    "OhneBall",
    "Schnelligkeit",
  ],
  physis: "abwehr",
};

const IAVan: Role = {
  primary: [
    "Deckung",
    "Dribbling",
    "Passen",
    "Tackling",
    "Einsatzfreude",
    "Entscheidungen",
    "OhneBall",
    "Stellungsspiel",
    "Ausdauer",
    "Schnelligkeit",
  ],
  secondary: [
    "Ballannahme",
    "Technik",
    "Weitschuesse",
    "Antizipation",
    "Konzentration",
    "Nervenstaerke",
    "Antritt",
  ],
  physis: "abwehr",
};

export const IAV = {
  IAVve,
  IAVun,
  IAVan,
};
