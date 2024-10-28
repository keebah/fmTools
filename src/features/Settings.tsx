import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Input } from "../components/Input";

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
