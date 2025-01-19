import { Attributes } from "../../types/player";
import { Role } from "../../types/role";

const ABRve: Role = {
  primary: [
    "Deckung",
    "Tackling",
    "Antizipation",
    "Entscheidungen",
    "Konzentration",
    "Stellungsspiel",
  ],
  secondary: ["Nervenstaerke", "Teamwork", "Kraft"],
  physis: "mittelfeld",
};

export const ABR = {
  ABRve,
};

export const defaultAttributes: { [Key in keyof Attributes]: number } = {
  Abschluss: 0,
  Ballannahme: 0,
  Deckung: 0,
  Dribbling: 0,
  Ecken: 0,
  Elfmeter: 0,
  Flanken: 0,
  Freistoeße: 0,
  Kopfball: 0,
  Passen: 0,
  Tackling: 0,
  Technik: 0,
  WeiteEinwuerfe: 0,
  Weitschuesse: 0,
  Aggressivitaet: 0,
  Antizipation: 0,
  Einsatzfreude: 0,
  Entscheidungen: 0,
  Flair: 0,
  Fuehrungsqualitaeten: 0,
  Konzentration: 0,
  Mut: 0,
  Nervenstaerke: 0,
  OhneBall: 0,
  Stellungsspiel: 0,
  Teamwork: 0,
  Uebersicht: 0,
  Zielstrebigkeit: 0,
  Antritt: 0,
  Ausdauer: 0,
  Balance: 0,
  Beweglichkeit: 0,
  Grundfitness: 0,
  Kraft: 0,
  Schnelligkeit: 0,
  Sprunghoehe: 0,
  Abschlag: 0,
  Abwurf: 0,
  EinsgegenEins: 0,
  Extentrizitaet: 0,
  Fausttendenz: 0,
  Halten: 0,
  Herauslaufen: 0,
  HoheBaelle: 0,
  Kommunikation: 0,
  Reflexe: 0,
  Strafraumkontrolle: 0,
};
