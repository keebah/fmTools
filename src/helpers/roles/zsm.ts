import { Role } from "../../types/role";

const ZSMve: Role = {
  primary: [
    "Ballannahme",
    "Passen",
    "Technik",
    "Einsatzfreude",
    "Entscheidungen",
    "Nervenstaerke",
    "Teamwork",
    "Uebersicht",
  ],
  secondary: ["Tackling", "Antizipation", "Stellungsspiel", "Balance"],
  physis: "mittelfeld",
};
const ZSMun: Role = {
  primary: [
    "Ballannahme",
    "Passen",
    "Technik",
    "Entscheidungen",
    "Nervenstaerke",
    "Teamwork",
    "Uebersicht",
  ],
  secondary: ["Antizipation", "Einsatzfreude", "OhneBall", "Balance"],
  physis: "mittelfeld",
};

export const ZSM = {
  ZSMve,
  ZSMun,
};
