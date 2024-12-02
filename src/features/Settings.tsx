import { useContext } from "react";

import { Input } from "../components/Input";
import { AppContext } from "../context/AppContext";

export const Settings = () => {
  const { settings, setSettings } = useContext(AppContext);
  return (
    <>
      Decimals:{" "}
      <Input
        onChange={(e) => setSettings({ decimals: parseFloat(e.target.value) })}
        value={settings.decimals}
      />
    </>
  );
};
