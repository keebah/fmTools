import { Card, Flex, Text } from "@radix-ui/themes";
import { useContext } from "react";

import { Input } from "../components/Input";
import { AppContext } from "../context/AppContext";

export const Settings = () => {
  const { settings, setSettings } = useContext(AppContext);
  return (
    <Flex>
      <Card>
        <Text>Decimals:</Text>
        <Input
          onChange={(e) =>
            setSettings({ decimals: parseFloat(e.target.value) })
          }
          value={settings.decimals}
        />
      </Card>
    </Flex>
  );
};
