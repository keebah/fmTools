import {
  Button,
  Card,
  Dialog,
  Flex,
  Grid,
  Select,
  Text,
} from "@radix-ui/themes";
import { AgGridReact } from "ag-grid-react";
import { useContext, useRef, useState } from "react";

import { AppContext } from "../../context/AppContext";
import { Player } from "../../types/player";
import { RoleWithKey } from "../../types/role";
import "./styles.css";
import { RoleSelector } from "./RoleSelector";
import { calculateFMRoleScore, roleAttributes } from "../../helpers/roles";

const ComparePlayerDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const { primaryDataSet, settings } = useContext(AppContext);
  const decimals = settings.decimals;
  const [role, setRole] = useState<RoleWithKey | undefined>(undefined);
  const [player1, setPlayer1] = useState<Player>();
  const [player2, setPlayer2] = useState<Player>();

  const availablePlayers = primaryDataSet?.players.filter(
    (p) => p.name !== player1?.name && p.name !== player2?.name
  );

  const roleScorePlayer1 =
    player1 && role && calculateFMRoleScore(player1, role, settings);
  const roleScorePlayer2 =
    player2 && role && calculateFMRoleScore(player2, role, settings);
  const delta =
    roleScorePlayer1 && roleScorePlayer2
      ? roleScorePlayer1.totalScore - roleScorePlayer2.totalScore
      : undefined;

  const selectedRoleAttributes = role && roleAttributes[role.key];

  const primaryAttributes = selectedRoleAttributes?.primary
    .map((a) => ({
      name: a,
      player1: player1?.attributes[a],
      player2: player2?.attributes[a],
      delta: (player1?.attributes[a] ?? 0) - (player2?.attributes[a] ?? 0),
    }))
    .sort((a, b) => a.delta - b.delta);

  const secondayAttributes = selectedRoleAttributes?.secondary
    .map((a) => ({
      name: a,
      player1: player1?.attributes[a],
      player2: player2?.attributes[a],
      delta: (player1?.attributes[a] ?? 0) - (player2?.attributes[a] ?? 0),
    }))
    .sort((a, b) => a.delta - b.delta);
  /*   const roleData =
    player &&
    Object.entries(roleAttributes)
      .map(([key, role]) => {
        const roleWithKey = { ...role, key: key as keyof Roles };
        const roleScore = calculateFMRoleScore(player, roleWithKey, settings);
        return { name: key, ...roleScore };
      })
      .sort(sortByTotalScore); */

  return (
    <Dialog.Root open={open}>
      <Dialog.Content>
        <Dialog.Title>Compare two players</Dialog.Title>
        <Card>
          Select Role: <RoleSelector setRole={setRole} />
        </Card>
        <Card>
          <Grid columns="2">
            <Text>Name</Text>{" "}
            <Grid columns="3">
              <Text>Primary</Text>
              <Text>Secondary</Text>
              <Text>Total</Text>
            </Grid>
            <Select.Root
              defaultValue={player1?.name}
              onValueChange={(value) => {
                const player = primaryDataSet?.players.find(
                  (entry) => entry.name === value
                );
                setPlayer1(player);
              }}
            >
              <Select.Trigger radius="large" placeholder="Select Player 1" />
              <Select.Content>
                <Select.Item value="none">none</Select.Item>
                {player1 && (
                  <Select.Item value={player1.name}>{player1.name}</Select.Item>
                )}
                {availablePlayers?.map((entry) => (
                  <Select.Item value={entry.name}>{entry.name}</Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Grid columns="3">
              <Text>{roleScorePlayer1?.primaryScore.toFixed(decimals)}</Text>
              <Text>{roleScorePlayer1?.secondaryScore.toFixed(decimals)}</Text>
              <Text>{roleScorePlayer1?.totalScore.toFixed(decimals)}</Text>
            </Grid>
            <Select.Root
              defaultValue={player2?.name}
              onValueChange={(value) => {
                const player = primaryDataSet?.players.find(
                  (entry) => entry.name === value
                );
                setPlayer2(player);
              }}
            >
              <Select.Trigger radius="large" placeholder="Select Player 2" />
              <Select.Content>
                <Select.Item value="none">none</Select.Item>
                {player2 && (
                  <Select.Item value={player2.name}>{player2.name}</Select.Item>
                )}
                {availablePlayers?.map((entry) => (
                  <Select.Item value={entry.name}>{entry.name}</Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Grid columns="3">
              <Text>{roleScorePlayer2?.primaryScore.toFixed(decimals)}</Text>
              <Text>{roleScorePlayer2?.secondaryScore.toFixed(decimals)}</Text>
              <Text>{roleScorePlayer2?.totalScore.toFixed(decimals)}</Text>
            </Grid>{" "}
            <Text>Delta</Text>{" "}
            <Grid columns="3">
              <Text>
                {(
                  (roleScorePlayer1?.primaryScore ?? 0) -
                  (roleScorePlayer2?.primaryScore ?? 0)
                ).toFixed(decimals)}
              </Text>
              <Text>
                {(
                  (roleScorePlayer1?.secondaryScore ?? 0) -
                  (roleScorePlayer2?.secondaryScore ?? 0)
                ).toFixed(decimals)}
              </Text>{" "}
              <Text>
                {(
                  (roleScorePlayer1?.totalScore ?? 0) -
                  (roleScorePlayer2?.totalScore ?? 0)
                ).toFixed(decimals)}
              </Text>
            </Grid>
          </Grid>
        </Card>
        <Card>
          <Grid columns="2">
            {primaryAttributes?.map((a) => (
              <>
                <Text>{a.name}</Text>
                <Grid columns="3">
                  <Text>{a.player1}</Text>
                  <Text>{a.player2}</Text>
                  <Text>{a.delta}</Text>
                </Grid>
              </>
            ))}
          </Grid>
        </Card>{" "}
        <Card>
          <Grid columns="2">
            {secondayAttributes?.map((a) => (
              <>
                <Text>{a.name}</Text>
                <Grid columns="3">
                  <Text>{a.player1}</Text>
                  <Text>{a.player2}</Text>
                  <Text>{a.delta}</Text>
                </Grid>
              </>
            ))}
          </Grid>
        </Card>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ComparePlayerDialog;
