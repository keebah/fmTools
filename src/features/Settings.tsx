import { Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useContext, useState } from "react";

import { AppContext } from "../context/AppContext";
import { RoleWithKey } from "../types/role";
import EditAttributesDialog from "./common/EditAttributesDialog";
import { RoleSelector } from "./common/RoleSelector";

export const Settings = () => {
  const { settings, setSettings } = useContext(AppContext);
  const [role, setRole] = useState<RoleWithKey | undefined>();

  return (
    <Flex>
      <Card>
        <Heading size="3">General Settings</Heading>
        <Text>Decimals:</Text>
        <TextField.Root
          size="1"
          placeholder="Decimals for calculated numbers"
          onChange={(e) =>
            setSettings({ decimals: parseFloat(e.target.value) })
          }
          value={settings.decimals}
        />
      </Card>
      <Card>
        <Heading size="3">FM Role Score Balance</Heading>
        <Text>Primary Weight:</Text>
        <TextField.Root
          size="1"
          placeholder="Primary weight for FM attributes"
          onChange={(e) =>
            setSettings({ primaryWeightFM: parseFloat(e.target.value) })
          }
          value={settings.decimals}
        />
        <Text>Secondary Weight:</Text>
        <TextField.Root
          size="1"
          placeholder="Secondary weight for FM attributes"
          onChange={(e) =>
            setSettings({ secondaryWeightFM: parseFloat(e.target.value) })
          }
          value={settings.decimals}
        />
      </Card>
      <Card>
        <Heading size="3">User Role Score Balance</Heading>
        <RoleSelector setRole={setRole} />
        <EditAttributesDialog role={role} />
      </Card>
    </Flex>
  );
};
