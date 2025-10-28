import { Box, Grid } from "@radix-ui/themes";
import { useContext } from "react";

import { SetTacticType } from ".";
import { AppContext } from "../../context/AppContext";
import {
  attackGroup,
  dmGroup,
  dmzGroup,
  fvaGroup,
  keeperGroup,
  maGroup,
  mGroup,
  mzGroup,
  omaGroup,
  omcGroup,
  vaGroup,
  vGroup,
  vzGroup,
} from "../../helpers/roles";
import { Tactic, TacticPlayers } from "../../types/tactics";
import { TacticsGridPositionBox } from "./TacticsGridPositionBox";

export const TacticsGrid = ({
  tactic,
  focusedPosition,
  setFocusedPosition,
  setTactic,
}: {
  tactic: Tactic | undefined;
  focusedPosition: keyof TacticPlayers | undefined;
  setFocusedPosition: React.Dispatch<
    React.SetStateAction<keyof TacticPlayers | undefined>
  >;
  setTactic: SetTacticType;
}) => {
  const { primaryDataSet } = useContext(AppContext);

  return (
    <Grid columns="7" gap="3" rows="6" width="auto">
      <Box></Box>
      <TacticsGridPositionBox
        isFocused={focusedPosition == "STZL"}
        allowedRoles={attackGroup}
        content={primaryDataSet}
        position={"STZL"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <Box></Box>
      <TacticsGridPositionBox
        isFocused={focusedPosition == "STZ"}
        allowedRoles={attackGroup}
        content={primaryDataSet}
        position={"STZ"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <Box></Box>
      <TacticsGridPositionBox
        isFocused={focusedPosition == "STZR"}
        allowedRoles={attackGroup}
        content={primaryDataSet}
        position={"STZR"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <Box></Box>
      <TacticsGridPositionBox
        isFocused={focusedPosition == "OML"}
        allowedRoles={omaGroup}
        content={primaryDataSet}
        position={"OML"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <Box></Box>
      <TacticsGridPositionBox
        isFocused={focusedPosition == "OMZL"}
        allowedRoles={omcGroup}
        content={primaryDataSet}
        position={"OMZL"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <TacticsGridPositionBox
        isFocused={focusedPosition == "OM"}
        allowedRoles={omcGroup}
        content={primaryDataSet}
        position={"OM"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <TacticsGridPositionBox
        isFocused={focusedPosition == "OMZR"}
        allowedRoles={omcGroup}
        content={primaryDataSet}
        position={"OMZR"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <Box></Box>
      <TacticsGridPositionBox
        isFocused={focusedPosition == "OMR"}
        allowedRoles={omaGroup}
        content={primaryDataSet}
        position={"OMR"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <TacticsGridPositionBox
        isFocused={focusedPosition == "ML"}
        allowedRoles={maGroup}
        content={primaryDataSet}
        position={"ML"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <Box></Box>
      <TacticsGridPositionBox
        isFocused={focusedPosition == "MZL"}
        allowedRoles={mzGroup}
        content={primaryDataSet}
        position={"MZL"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <TacticsGridPositionBox
        isFocused={focusedPosition == "MZ"}
        allowedRoles={mGroup}
        content={primaryDataSet}
        position={"MZ"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <TacticsGridPositionBox
        isFocused={focusedPosition == "MZR"}
        allowedRoles={mzGroup}
        content={primaryDataSet}
        position={"MZR"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <Box></Box>
      <TacticsGridPositionBox
        isFocused={focusedPosition == "MR"}
        allowedRoles={maGroup}
        content={primaryDataSet}
        position={"MR"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <TacticsGridPositionBox
        isFocused={focusedPosition == "FVL"}
        allowedRoles={fvaGroup}
        content={primaryDataSet}
        position={"FVL"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <Box></Box>
      <TacticsGridPositionBox
        isFocused={focusedPosition == "DMZL"}
        allowedRoles={dmzGroup}
        content={primaryDataSet}
        position={"DMZL"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <TacticsGridPositionBox
        isFocused={focusedPosition == "DM"}
        allowedRoles={dmGroup}
        content={primaryDataSet}
        position={"DM"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <TacticsGridPositionBox
        isFocused={focusedPosition == "DMZR"}
        allowedRoles={dmzGroup}
        content={primaryDataSet}
        position={"DMZR"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <Box></Box>
      <TacticsGridPositionBox
        isFocused={focusedPosition == "FVR"}
        allowedRoles={fvaGroup}
        content={primaryDataSet}
        position={"FVR"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <TacticsGridPositionBox
        isFocused={focusedPosition == "VL"}
        allowedRoles={vaGroup}
        content={primaryDataSet}
        position={"VL"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <Box></Box>
      <TacticsGridPositionBox
        isFocused={focusedPosition == "VZL"}
        allowedRoles={vzGroup}
        content={primaryDataSet}
        position={"VZL"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <TacticsGridPositionBox
        isFocused={focusedPosition == "VZ"}
        allowedRoles={vGroup}
        content={primaryDataSet}
        position={"VZ"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <TacticsGridPositionBox
        isFocused={focusedPosition == "VZR"}
        allowedRoles={vzGroup}
        content={primaryDataSet}
        position={"VZR"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <Box></Box>
      <TacticsGridPositionBox
        isFocused={focusedPosition == "VR"}
        allowedRoles={vaGroup}
        content={primaryDataSet}
        position={"VR"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <Box></Box>
      <Box></Box>
      <Box></Box>
      <TacticsGridPositionBox
        isFocused={focusedPosition == "TW"}
        allowedRoles={keeperGroup}
        content={primaryDataSet}
        position={"TW"}
        tactic={tactic}
        setFocusedPosition={setFocusedPosition}
        setTactic={setTactic}
      />
      <Box></Box>
      <Box></Box>
      <Box></Box>
    </Grid>
  );
};
