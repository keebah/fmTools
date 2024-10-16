import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { dummyPlayer } from "../../helpers/player";
import { calculateRoleScore, roleAttributes } from "../../helpers/roles";
import { Player } from "../../types/player";
import { Role, Roles } from "../../types/role";
import { PlayerProfile } from "./PlayerProfile";

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
        <div>
          <PlayerProfile
            selectedPlayer={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
          />
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
