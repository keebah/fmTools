import { Role } from "../../types/role";

const VOLun: Role = {
  primary: [
    "Deckung",
    "Passen",
    "Tackling",
    "Einsatzfreude",
    "OhneBall",
    "Stellungsspiel",
    "Ausdauer",
    "Schnelligkeit",
  ],
  secondary: [
    "Abschluss",
    "Ballannahme",
    "Weitschuesse",
    "Antizipation",
    "Entscheidungen",
    "Konzentration",
    "Nervenstaerke",
    "Antritt",
    "Balance",
    "Kraft",
  ],
  physis: "mittelfeld",
};

const VOLan: Role = {
  primary: [
    "Abschluss",
    "Passen",
    "Tackling",
    "Weitschuesse",
    "Antizipation",
    "Einsatzfreude",
    "OhneBall",
    "Stellungsspiel",
    "Ausdauer",
    "Schnelligkeit",
  ],
  secondary: [
    "Ballannahme",
    "Deckung",
    "Entscheidungen",
    "Konzentration",
    "Nervenstaerke",
    "Antritt",
    "Balance",
    "Kraft",
  ],
  physis: "mittelfeld",
};

export const VOL = {
  VOLun,
  VOLan,
};
