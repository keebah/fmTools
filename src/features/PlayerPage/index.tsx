import { useContext, useState } from "react";

import { AppContext } from "../../context/AppContext";
import { dummyPlayer } from "../../helpers/player";
import { calculateRoleScore } from "../../helpers/roles";
import { Player } from "../../types/player";
import { Role } from "../../types/role";
import { RoleSelector } from "../common/RoleSelector";
import { cn } from "../utils/tailwind";
import { AllRolesForPlayer } from "./AllRolesForPlayer";
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
    <div className="flex">
      <div className="ml-2">
        Select Player:
        <select
          onChange={(e) => {
            const player = primaryDataSet?.players.find(
              (player) => player.name === e.target.value
            );
            if (player) {
              setSelectedPlayer(player);
            }
          }}
        >
          <option></option>
          {primaryDataSet?.players.map((player) => (
            <option key={player.name}>{player.name}</option>
          ))}
        </select>
        <div>
          <PlayerProfile
            selectedPlayer={selectedPlayer}
            setSelectedPlayer={setSelectedPlayer}
          />
        </div>
        <div>
          <AllRolesForPlayer selectedPlayer={selectedPlayer} />
        </div>
      </div>

      <div>
        Select role to compare to rest of the squad:
        <RoleSelector setRole={setRole} />
        <div className="grid grid-cols-4 gap-x-2">
          <div>Name</div>
          <div>Primary</div>
          <div>Secondary</div>
          <div>Total</div>
          <div className="border border-black">
            {selectedPlayer && selectedPlayer.name}
          </div>
          <div className="border border-black">
            {roleScore && roleScore.primaryScore.toFixed(1)}
          </div>
          <div className="border border-black">
            {roleScore && roleScore.secondaryScore.toFixed(1)}
          </div>
          <div className="border border-black">
            {roleScore && roleScore.totalScore.toFixed(1)}
          </div>
          {sortedPlayers?.map((player) => {
            const isSelectedPlayer = player.name === selectedPlayer.name;
            return (
              <>
                <div className={cn(isSelectedPlayer && "font-bold")}>
                  {player.name}
                </div>
                <div>{player.primaryScore.toFixed(1)}</div>
                <div>{player.secondaryScore.toFixed(1)}</div>
                <div>{player.totalScore.toFixed(1)}</div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
