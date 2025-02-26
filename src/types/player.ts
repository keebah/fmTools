import { Roles } from "./role";

export type Data = {
  name: string;
  players: Player[];
};

export type PlayerWithRole = {
  roleName: keyof Roles | undefined;
  primaryScore: number;
  secondaryScore: number;
  totalScore: number;
} & Player;

export type Player = {
  name: string;
  attributes: Attributes;
  physis: { tor: number; abwehr: number; mittelfeld: number; angriff: number };
  fibra: number;
};

export type Attributes = {
  Abschluss: number;
  Ballannahme: number;
  Deckung: number;
  Dribbling: number;
  Ecken: number;
  Elfmeter: number;
  Flanken: number;
  Freistoeße: number;
  Kopfball: number;
  Passen: number;
  Tackling: number;
  Technik: number;
  WeiteEinwuerfe: number;
  Weitschuesse: number;
  Aggressivitaet: number;
  Antizipation: number;
  Einsatzfreude: number;
  Entscheidungen: number;
  Flair: number;
  Fuehrungsqualitaeten: number;
  Konzentration: number;
  Mut: number;
  Nervenstaerke: number;
  OhneBall: number;
  Stellungsspiel: number;
  Teamwork: number;
  Uebersicht: number;
  Zielstrebigkeit: number;
  Antritt: number;
  Ausdauer: number;
  Balance: number;
  Beweglichkeit: number;
  Grundfitness: number;
  Kraft: number;
  Schnelligkeit: number;
  Sprunghoehe: number;
  Abschlag: number;
  Abwurf: number;
  EinsgegenEins: number;
  Extentrizitaet: number;
  Fausttendenz: number;
  Halten: number;
  Herauslaufen: number;
  HoheBaelle: number;
  Kommunikation: number;
  Reflexe: number;
  Strafraumkontrolle: number;
};
