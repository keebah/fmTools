import { Button, Card, Dialog, Flex } from "@radix-ui/themes";
import { ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useContext, useMemo, useRef } from "react";

import { AppContext } from "../../context/AppContext";
import { calculateFMRoleScore, roleAttributes } from "../../helpers/roles";
import { sortByTotalScore } from "../../helpers/sorting";
import { Player } from "../../types/player";
import { Roles } from "../../types/role";
import "./styles.css";

const PlayerDialog = ({
  open,
  setOpen,
  player,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  player: Player;
}) => {
  const gridRef = useRef<AgGridReact>(null);

  const { settings } = useContext(AppContext);
  const decimals = settings.decimals;
  const roleData =
    player &&
    Object.entries(roleAttributes)
      .map(([key, role]) => {
        const roleWithKey = { ...role, key: key as keyof Roles };
        const roleScore = calculateFMRoleScore(player, roleWithKey, settings);
        return { name: key, ...roleScore };
      })
      .sort(sortByTotalScore);

  const colDefs = useMemo(() => {
    return [
      { field: "name" },
      {
        cellRenderer: ({ value }: ICellRendererParams) =>
          value?.toFixed(decimals),
        field: "primaryScore",
        title: "Primary",
      },
      {
        cellRenderer: ({ value }: ICellRendererParams) =>
          value?.toFixed(decimals),
        field: "secondaryScore",
        title: "Secondary",
      },
      {
        cellRenderer: ({ value }: ICellRendererParams) =>
          value?.toFixed(decimals),
        field: "totalScore",
        title: "Total",
      },
    ];
  }, [roleData]);
  const fitAllColumns = useCallback(() => {
    gridRef?.current?.api.autoSizeAllColumns();
  }, []);

  const onFirstDataRendered = useCallback(() => {
    fitAllColumns();
  }, [fitAllColumns]);
  return (
    <Dialog.Root open={open}>
      <Dialog.Content>
        <Dialog.Title>{player.name}</Dialog.Title>
        <Card>
          <div className="w-full h-[calc(100vh-500px)] overflow-visible border-b-[2px] border-gray-900 pb-1 ag-theme-alpine">
            <AgGridReact
              animateRows={true}
              columnDefs={colDefs}
              defaultColDef={{
                sortable: true,
                filter: true,
                floatingFilter: false,
              }}
              onFirstDataRendered={onFirstDataRendered}
              ref={gridRef}
              rowData={roleData}
            />
          </div>
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

export default PlayerDialog;
