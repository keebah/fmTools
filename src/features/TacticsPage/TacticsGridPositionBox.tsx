import { Box, Card } from "@radix-ui/themes";
import { SetTacticType } from ".";
import { Data } from "../../types/player";
import { Role, Roles, RoleWithKey } from "../../types/role";
import { Tactic, TacticPlayers } from "../../types/tactics";
import { PlayerSelect } from "../common/PlayerSelect";
import { RoleSelectorTacticsGrid } from "../common/RoleSelectorTacticsGrid";

export type SelectedRole = { roleName: string } & Role;

export const TacticsGridPositionBox = ({
  allowedRoles,
  content,
  position,
  tactic,
  setTactic,
}: {
  allowedRoles: { [key: string]: Role };
  content: Data | undefined;
  position: keyof TacticPlayers;
  tactic: Tactic | undefined;
  setTactic: SetTacticType;
}) => {
  const players = tactic?.players;
  const player = players && players[position]?.player;
  const selectablePlayers =
    content?.players.filter(
      (player) =>
        !Object.values(tactic?.players || {}).some(
          (item) => item?.player?.name === player.name
        )
    ) ?? [];
  const availablePlayers = player
    ? [player, ...selectablePlayers]
    : selectablePlayers;
  const onRoleSelectorChange = (
    allowedRoles: Partial<Roles>,
    position: keyof TacticPlayers
  ) => {
    return (value: string) => {
      if (value === "none") {
        setTactic("role", undefined, position, undefined);
        return;
      }
      const roleKey = value as keyof Roles;
      const role = {
        ...allowedRoles[roleKey],
        key: value as keyof Roles,
      } as RoleWithKey;
      setTactic("role", undefined, position, role);
    };
  };

  const onPlayerSelectorChange = (position: keyof TacticPlayers) => {
    return (value: string) => {
      const player = content?.players.find((player) => player.name === value);
      setTactic("player", player, position, undefined);
    };
  };
  if (!content) {
    return (
      <Box>
        <Card></Card>
      </Box>
    );
  }
  return (
    <Box>
      <Card>
        <PlayerSelect
          availablePlayers={availablePlayers}
          onValueChange={onPlayerSelectorChange(position)}
        />
        <RoleSelectorTacticsGrid
          availableRoles={allowedRoles}
          onValueChange={onRoleSelectorChange(allowedRoles, position)}
        />
      </Card>
    </Box>
  );
};
