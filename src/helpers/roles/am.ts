import { Role } from "../../types/role";

const AMve: Role = {
  primary: [
    "Passen",
    "Tackling",
    "Einsatzfreude",
    "Entscheidungen",
    "Konzentration",
    "Stellungsspiel",
    "Teamwork",
  ],
  secondary: [
    "Ballannahme",
    "Deckung",
    "Flanken",
    "Technik",
    "Antizipation",
    "Nervenstaerke",
    "Ausdauer",
  ],
  physis: "mittelfeld",
};
const AMun: Role = {
  primary: [
    "Passen",
    "Tackling",
    "Einsatzfreude",
    "Entscheidungen",
    "Teamwork",
    "Ausdauer",
  ],
  secondary: [
    "Ballannahme",
    "Flanken",
    "Technik",
    "Antizipation",
    "Konzentration",
    "Nervenstaerke",
    "OhneBall",
    "Stellungsspiel",
    "Uebersicht",
  ],
  physis: "mittelfeld",
};

const AMan: Role = {
  primary: [
    "Ballannahme",
    "Flanken",
    "Passen",
    "Einsatzfreude",
    "Entscheidungen",
    "Teamwork",
    "Ausdauer",
  ],
  secondary: [
    "Tackling",
    "Technik",
    "Antizipation",
    "Nervenstaerke",
    "OhneBall",
    "Uebersicht",
  ],
  physis: "mittelfeld",
};

export const AM = {
  AMve,
  AMun,
  AMan,
};
