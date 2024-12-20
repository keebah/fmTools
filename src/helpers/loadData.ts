import { Attributes, Player } from "../types/player";

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
    Abschluss: parseFloat(line[2]),
    Ballannahme: parseFloat(line[3]),
    Deckung: parseFloat(line[4]),
    Dribbling: parseFloat(line[5]),
    Ecken: parseFloat(line[6]),
    Elfmeter: parseFloat(line[7]),
    Flanken: parseFloat(line[8]),
    Freistoeße: parseFloat(line[9]),
    Kopfball: parseFloat(line[10]),
    Passen: parseFloat(line[11]),
    Tackling: parseFloat(line[12]),
    Technik: parseFloat(line[13]),
    WeiteEinwuerfe: parseFloat(line[14]),
    Weitschuesse: parseFloat(line[15]),
    Aggressivitaet: parseFloat(line[16]),
    Antizipation: parseFloat(line[17]),
    Einsatzfreude: parseFloat(line[18]),
    Entscheidungen: parseFloat(line[19]),
    Flair: parseFloat(line[20]),
    Fuehrungsqualitaeten: parseFloat(line[21]),
    Konzentration: parseFloat(line[22]),
    Mut: parseFloat(line[23]),
    Nervenstaerke: parseFloat(line[24]),
    OhneBall: parseFloat(line[25]),
    Stellungsspiel: parseFloat(line[26]),
    Teamwork: parseFloat(line[27]),
    Uebersicht: parseFloat(line[28]),
    Zielstrebigkeit: parseFloat(line[29]),
    Antritt: parseFloat(line[30]),
    Ausdauer: parseFloat(line[31]),
    Balance: parseFloat(line[32]),
    Beweglichkeit: parseFloat(line[33]),
    Grundfitness: parseFloat(line[34]),
    Kraft: parseFloat(line[35]),
    Schnelligkeit: parseFloat(line[36]),
    Sprunghoehe: parseFloat(line[37]),
    Abschlag: parseFloat(line[38]),
    Abwurf: parseFloat(line[39]),
    EinsgegenEins: parseFloat(line[40]),
    Extentrizitaet: parseFloat(line[41]),
    Fausttendenz: parseFloat(line[42]),
    Halten: parseFloat(line[43]),
    Herauslaufen: parseFloat(line[44]),
    HoheBaelle: parseFloat(line[45]),
    Kommunikation: parseFloat(line[46]),
    Reflexe: parseFloat(line[47]),
    Strafraumkontrolle: parseFloat(line[48]),
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
