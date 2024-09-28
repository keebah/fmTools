import { Attributes, Player } from "../types/player";
import { Role, Roles } from "../types/role";

export const roleAttributes: Roles = {
  BBMu: {
    primary: [
      "Passen",
      "Tackling",
      "Einsatzfreude",
      "OhneBall",
      "Teamwork",
      "Ausdauer",
    ],
    secondary: [
      "Abschluss",
      "Ballannahme",
      "Dribbling",
      "Technik",
      "Weitschuesse",
      "Aggressivitaet",
      "Antizipation",
      "Entscheidungen",
      "Nervenstaerke",
      "Stellungsspiel",
      "Antritt",
      "Balance",
      "Kraft",
      "Schnelligkeit",
    ],
    physis: "mittelfeld",
  },
};

export const calculateRoleScore = (player: Player, role: Role) => {
  const attributes = player.attributes;
  const physis = player.physis;

  const sumPrimary = role.primary.reduce(
    (total: number, value: keyof Attributes) => {
      const attValue = attributes[value];
      if (player && player.attributes) {
        return total + (attValue || 0);
      }
      return total;
    },
    0
  );
  const sumSecondary = role.secondary.reduce((total, value) => {
    if (player && player.attributes) {
      return total + (attributes[value] || 0);
    }
    return total;
  }, 0);
  const primaryScore = sumPrimary / role.primary.length;
  const secondaryScore = sumSecondary / role.secondary.length;
  const physisScore = physis[role.physis];
  const totalScore =
    (primaryScore * 1.5 + secondaryScore * 1 + physisScore * 1) / 3.5;

  return { primaryScore, secondaryScore, totalScore };
};
