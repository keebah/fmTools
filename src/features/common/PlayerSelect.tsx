import { Select } from "@radix-ui/themes";

import { Player } from "../../types/player";

export const PlayerSelect = ({
  availablePlayers,
  onValueChange,
}: {
  availablePlayers: Player[] | undefined;
  onValueChange: (value: string) => void;
}) => {
  return (
    <Select.Root defaultValue="" onValueChange={onValueChange}>
      <Select.Trigger radius="large" placeholder="Select player" />
      <Select.Content>
        <Select.Item value="none">none</Select.Item>
        {availablePlayers?.map((player) => (
          <Select.Item value={player.name}>{player.name}</Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
