import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Player } from "../../types/player";
import { Attributes } from "../../types/player";
import { Role, Roles } from "../../types/role";
import { calculateRoleScore, roleAttributes } from "../../helpers/roles";
import { dummyPlayer } from "../../helpers/player";
import { Input } from "../../components/Input";
import {
  calcPhysisAbwehr,
  calcPhysisAngriff,
  calcPhysisMittelfeld,
} from "../../helpers/loadData";
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

const AttributeLine = ({
  attribute,
  player,
  setSelectedPlayer,
}: {
  attribute: keyof Attributes;
  player: Player | undefined;
  setSelectedPlayer?: React.Dispatch<React.SetStateAction<Player>>;
}) => (
  <div className="flex">
    <div>{attribute}</div>
    <div className="ml-auto">
      {setSelectedPlayer ? (
        <Input
          className="w-8"
          defaultValue={player?.attributes[attribute]}
          onChange={(e) => {
            setSelectedPlayer((prev) => {
              prev.attributes[attribute] = parseFloat(e.target.value);
              prev.physis.abwehr = calcPhysisAbwehr(prev.attributes);
              prev.physis.mittelfeld = calcPhysisMittelfeld(prev.attributes);
              prev.physis.angriff = calcPhysisAngriff(prev.attributes);

              return prev;
            });
          }}
          type="number"
        />
      ) : (
        player?.attributes[attribute]
      )}
    </div>
  </div>
);

export const PlayerPage = () => {
  const { primaryDataSet } = useContext(AppContext);

  const [selectedPlayer, setSelectedPlayer] = useState<Player>(dummyPlayer);
  const [role, setRole] = useState<Role | undefined>();

  const roleScore =
    selectedPlayer && role && calculateRoleScore(selectedPlayer, role);

  const sortedPlayers = primaryDataSet?.players
    .map((player) => {
      if (role) {
        const score = calculateRoleScore(player, role);
        return { ...player, ...score };
      }
      return { ...player, primaryScore: 0, secondaryScore: 0, totalScore: 0 };
    })
    .sort((a, b) => {
      if (a.totalScore > b.totalScore) {
        return -1;
      }
      return 1;
    });

  return (
    <div>
      <div>
        Select Player:
        <select
          onChange={(e) => {
            const player = primaryDataSet?.players.find(
              (player) => player.name === e.target.value
            );
            player && setSelectedPlayer(player);
          }}
        >
          <option></option>
          {primaryDataSet?.players.map((player) => (
            <option key={player.name}>{player.name}</option>
          ))}
        </select>
        Role:
        <select
          onChange={(e) => {
            const stuff = roleAttributes[e.target.value as keyof Roles];
            setRole(stuff);
          }}
        >
          <option></option>
          {Object.keys(roleAttributes).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
      </div>
      <div className="flex">
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
        <div>
          <div>All Players for these Roles</div>
          <div className="grid grid-cols-4 gap-x-2">
            <div>Name</div>
            <div>Primary</div>
            <div>Secondary</div>
            <div>Total</div>
            <div>{selectedPlayer && selectedPlayer.name}</div>
            <div>{roleScore && roleScore.primaryScore.toFixed(1)}</div>
            <div>{roleScore && roleScore.secondaryScore.toFixed(1)}</div>
            <div>{roleScore && roleScore.totalScore.toFixed(1)}</div>
            {sortedPlayers?.map((player) => {
              return (
                <>
                  <div>{player.name}</div>
                  <div>{player.primaryScore.toFixed(1)}</div>
                  <div>{player.secondaryScore.toFixed(1)}</div>
                  <div>{player.totalScore.toFixed(1)}</div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
