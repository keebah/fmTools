import { Role } from "../../types/role";

const TWve: Role = {
  primary: [
    "Abschlag",
    "Halten",
    "HoheBaelle",
    "Kommunikation",
    "Reflexe",
    "Strafraumkontrolle",
    "Konzentration",
    "Stellungsspiel",
    "Beweglichkeit",
  ],
  secondary: ["Abwurf", "EinsgegenEins", "Antizipation", "Entscheidungen"],
  physis: "tor",
};
const MTWve: Role = {
  primary: [
    "Abschlag",
    "EinsgegenEins",
    "Reflexe",
    "Strafraumkontrolle",
    "Antizipation",
    "Konzentration",
    "Stellungsspiel",
    "Beweglichkeit",
  ],
  secondary: [
    "Abwurf",
    "Ballannahme",
    "Halten",
    "Herauslaufen",
    "HoheBaelle",
    "Kommunikation",
    "Passen",
    "Entscheidungen",
    "Nervenstaerke",
    "Uebersicht",
    "Antritt",
  ],
  physis: "tor",
};

const MTWun: Role = {
  primary: [
    "Abschlag",
    "EinsgegenEins",
    "Herauslaufen",
    "Reflexe",
    "Strafraumkontrolle",
    "Antizipation",
    "Konzentration",
    "Nervenstaerke",
    "Stellungsspiel",
    "Beweglichkeit",
  ],
  secondary: [
    "Abwurf",
    "Ballannahme",
    "Halten",
    "HoheBaelle",
    "Kommunikation",
    "Passen",
    "Entscheidungen",
    "Uebersicht",
    "Antritt",
  ],
  physis: "tor",
};

const MTWan: Role = {
  primary: [
    "Abschlag",
    "EinsgegenEins",
    "Herauslaufen",
    "Reflexe",
    "Strafraumkontrolle",
    "Antizipation",
    "Konzentration",
    "Nervenstaerke",
    "Stellungsspiel",
    "Beweglichkeit",
  ],
  secondary: [
    "Abwurf",
    "Ballannahme",
    "Extentrizitaet",
    "Halten",
    "HoheBaelle",
    "Kommunikation",
    "Passen",
    "Entscheidungen",
    "Uebersicht",
    "Antritt",
  ],
  physis: "tor",
};

export const TW = {
  TWve,
  MTWve,
  MTWun,
  MTWan,
};
