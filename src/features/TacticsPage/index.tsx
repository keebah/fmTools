import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

import { Input } from "../../components/Input";
import {
  attackGroup,
  defenseGroup,
  keeperGroup,
  midfieldGroup,
  roleAttributes,
} from "../../helpers/roles";
import { BestRoleForPlayer } from "./BestRoleForPlayer";
import { TacticsGrid } from "./TacticsGrid";
import { Button } from "../../components/Button";

export const RoleGrid = () => {
  const { primaryDataSet } = useContext(AppContext);
  const [roleFilter, setRoleFilter] = useState([""]);
  if (!primaryDataSet) {
    return <>Need to select data set</>;
  }
  return (
    <div className="flex">
      <div className="w-full">
        <TacticsGrid />
        <div className="grid grid-cols-4 gap-x-2">
          <div>Name</div>
          <div>Role 1</div>
          <div>Role 2</div>
          <div>Role 3</div>
          {primaryDataSet.players.map((player) => (
            <>
              <div>{player.name}</div>
              <BestRoleForPlayer
                roleFilter={roleFilter}
                selectedPlayer={player}
              />
            </>
          ))}
        </div>
      </div>
      <div className="border border-black m-1 p-1 ml-auto min-w-[310px]">
        Filter Roles{" "}
        <Button onClick={() => setRoleFilter(Object.keys(roleAttributes))}>
          Select all
        </Button>{" "}
        <Button onClick={() => setRoleFilter([])}>Deselect all</Button>
        <div className="flex">
          {[keeperGroup, defenseGroup, midfieldGroup, attackGroup].map(
            (group) => (
              <div>
                <Input
                  type="checkbox"
                  onChange={(e) => {
                    const groupKeys = Object.keys(group);
                    if (e.target.checked) {
                      setRoleFilter((prev) => [...prev, ...groupKeys]);
                    } else {
                      setRoleFilter((prev) =>
                        prev.filter((key) => !groupKeys.includes(key))
                      );
                    }
                  }}
                />
                All
                {Object.keys(group).map((item) => (
                  <div className="flex">
                    <div>
                      <Input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRoleFilter((prev) => [...prev, item]);
                          } else {
                            setRoleFilter((prev) =>
                              prev.filter((entry) => entry !== item)
                            );
                          }
                        }}
                        checked={roleFilter.includes(item)}
                      />
                    </div>
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
