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
  primary: ["Passen"],
  secondary: ["Abschluss"],
  physis: "tor",
};

const MTWun: Role = {
  primary: ["Passen"],
  secondary: ["Abschluss"],
  physis: "tor",
};

const MTWan: Role = {
  primary: ["Passen"],
  secondary: ["Abschluss"],
  physis: "tor",
};

export const TW = {
  TWve,
  MTWve,
  MTWun,
  MTWan,
};
