import { Dispatch, SetStateAction } from "react";

import { Attributes, Player } from "../../../types/player";
import { AttributeLine } from "./AttributeLine";

const groupedAttributes = {
  Technik: [
    "Abschluss",
    "Ballannahme",
    "Deckung",
    "Dribbling",
    "Ecken",
    "Elfmeter",
    "Flanken",
    "Freistoeße",
    "Kopfball",
    "Passen",
    "Tackling",
    "Technik",
    "WeiteEinwuerfe",
    "Weitschuesse",
  ],
  Mental: [
    "Aggressivitaet",
    "Antizipation",
    "Einsatzfreude",
    "Entscheidungen",
    "Flair",
    "Fuehrungsqualitaeten",
    "Konzentration",
    "Mut",
    "Nervenstaerke",
    "OhneBall",
    "Stellungsspiel",
    "Teamwork",
    "Uebersicht",
    "Zielstrebigkeit",
  ],
  Physis: [
    "Antritt",
    "Ausdauer",
    "Balance",
    "Beweglichkeit",
    "Grundfitness",
    "Kraft",
    "Schnelligkeit",
    "Sprunghoehe",
  ],
};
export const PlayerProfile = ({
  selectedPlayer,
  setSelectedPlayer,
}: {
  selectedPlayer: Player;
  setSelectedPlayer: Dispatch<SetStateAction<Player>>;
}) => {
  return (
    <div className="grid grid-cols-3">
      <div className="mx-3">
        <div>Technik</div>
        {groupedAttributes.Technik.map((attribute) => (
          <AttributeLine
            attribute={attribute as keyof Attributes}
            player={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
          />
        ))}
      </div>
      <div className="mx-3">
        <div>Mental</div>
        {groupedAttributes.Mental.map((attribute) => (
          <AttributeLine
            attribute={attribute as keyof Attributes}
            player={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
          />
        ))}
      </div>
      <div className="mx-3">
        <div>Physis</div>
        {groupedAttributes.Physis.map((attribute) => (
          <AttributeLine
            attribute={attribute as keyof Attributes}
            player={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
          />
        ))}
      </div>
    </div>
  );
};
