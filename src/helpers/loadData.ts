import { Attributes, Player } from "../types/player";

const convertValue = (line: string) => {
  const value = parseFloat(line);
  if (!Number.isNaN(value)) {
    return value;
  }
  return 0;
};
export const calcPhysisTor = (attributes: Player["attributes"]) => {
  const gewichte = 8;
  const summe =
    attributes.Antritt * 1 +
    attributes.Ausdauer * 1 +
    attributes.Balance * 1 +
    attributes.Beweglichkeit * 1 +
    attributes.Grundfitness * 1 +
    attributes.Kraft * 1 +
    attributes.Schnelligkeit * 1 +
    attributes.Sprunghoehe * 1;
  return summe / gewichte;
};
export const calcPhysisAbwehr = (attributes: Player["attributes"]) => {
  const gewichte = 13;
  const summe =
    attributes.Antritt * 2 +
    attributes.Ausdauer * 1 +
    attributes.Balance * 1 +
    attributes.Beweglichkeit * 1 +
    attributes.Grundfitness * 1 +
    attributes.Kraft * 2 +
    attributes.Schnelligkeit * 2 +
    attributes.Sprunghoehe * 3;
  return summe / gewichte;
};
export const calcPhysisMittelfeld = (attributes: Player["attributes"]) => {
  const gewichte = 14;
  const summe =
    attributes.Antritt * 3 +
    attributes.Ausdauer * 2 +
    attributes.Balance * 1 +
    attributes.Beweglichkeit * 1 +
    attributes.Grundfitness * 2 +
    attributes.Kraft * 1 +
    attributes.Schnelligkeit * 3 +
    attributes.Sprunghoehe * 1;
  return summe / gewichte;
};
export const calcPhysisAngriff = (attributes: Player["attributes"]) => {
  const gewichte = 13;
  const summe =
    attributes.Antritt * 3 +
    attributes.Ausdauer * 1 +
    attributes.Balance * 2 +
    attributes.Beweglichkeit * 1 +
    attributes.Grundfitness * 1 +
    attributes.Kraft * 2 +
    attributes.Schnelligkeit * 3 +
    attributes.Sprunghoehe * 1;
  return summe / gewichte;
};
const convertLineToPlayer = (line: string[]): Player => {
  const attributes: Attributes = {
    Abschluss: convertValue(line[2]),
    Ballannahme: convertValue(line[3]),
    Deckung: convertValue(line[4]),
    Dribbling: convertValue(line[5]),
    Ecken: convertValue(line[6]),
    Elfmeter: convertValue(line[7]),
    Flanken: convertValue(line[8]),
    Freistoeße: convertValue(line[9]),
    Kopfball: convertValue(line[10]),
    Passen: convertValue(line[11]),
    Tackling: convertValue(line[12]),
    Technik: convertValue(line[13]),
    WeiteEinwuerfe: convertValue(line[14]),
    Weitschuesse: convertValue(line[15]),
    Aggressivitaet: convertValue(line[16]),
    Antizipation: convertValue(line[17]),
    Einsatzfreude: convertValue(line[18]),
    Entscheidungen: convertValue(line[19]),
    Flair: convertValue(line[20]),
    Fuehrungsqualitaeten: convertValue(line[21]),
    Konzentration: convertValue(line[22]),
    Mut: convertValue(line[23]),
    Nervenstaerke: convertValue(line[24]),
    OhneBall: convertValue(line[25]),
    Stellungsspiel: convertValue(line[26]),
    Teamwork: convertValue(line[27]),
    Uebersicht: convertValue(line[28]),
    Zielstrebigkeit: convertValue(line[29]),
    Antritt: convertValue(line[30]),
    Ausdauer: convertValue(line[31]),
    Balance: convertValue(line[32]),
    Beweglichkeit: convertValue(line[33]),
    Grundfitness: convertValue(line[34]),
    Kraft: convertValue(line[35]),
    Schnelligkeit: convertValue(line[36]),
    Sprunghoehe: convertValue(line[37]),
    Abschlag: convertValue(line[38]),
    Abwurf: convertValue(line[39]),
    EinsgegenEins: convertValue(line[40]),
    Extentrizitaet: convertValue(line[41]),
    Fausttendenz: convertValue(line[42]),
    Halten: convertValue(line[43]),
    Herauslaufen: convertValue(line[44]),
    HoheBaelle: convertValue(line[45]),
    Kommunikation: convertValue(line[46]),
    Reflexe: convertValue(line[47]),
    Strafraumkontrolle: convertValue(line[48]),
  };
  return {
    name: line[1].trim(),
    attributes,
    physis: {
      tor: calcPhysisTor(attributes),
      abwehr: calcPhysisAbwehr(attributes),
      mittelfeld: calcPhysisMittelfeld(attributes),
      angriff: calcPhysisAngriff(attributes),
    },
  };
};

export const loadData = (fileContent: string) => {
  const lineEnding = fileContent.includes("\r\n") ? "\r\n" : "\n";
  const lines = fileContent.split(lineEnding);
  let output;
  for (const line of lines) {
    const split = line.split("|");
    if (split.length > 4 && split[1].trim().toLowerCase() !== "name") {
      const player = convertLineToPlayer(split);
      if (output) {
        output = [...output, player];
      } else {
        output = [player];
      }
    }
  }
  return output;
};
