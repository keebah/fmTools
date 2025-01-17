import { DataList, Flex, TextField } from "@radix-ui/themes";
import { useContext } from "react";

import { AppContext } from "../../context/AppContext";
import { defaultAttributes } from "../../helpers/roles/abr";
import { RoleAttributeWeights } from "../../types/app";
import { RoleWithKey } from "../../types/role";

const groupedAttributes = {
  Technik: [
    "Abschluss",
    "Ballannahme",
    "Deckung",
    "Dribbling",
    "Ecken",
    "Elfmeter",
    "Flanken",
    "Freistoeße",
    "Kopfball",
    "Passen",
    "Tackling",
    "Technik",
    "WeiteEinwuerfe",
    "Weitschuesse",
  ],
  Mental: [
    "Aggressivitaet",
    "Antizipation",
    "Einsatzfreude",
    "Entscheidungen",
    "Flair",
    "Fuehrungsqualitaeten",
    "Konzentration",
    "Mut",
    "Nervenstaerke",
    "OhneBall",
    "Stellungsspiel",
    "Teamwork",
    "Uebersicht",
    "Zielstrebigkeit",
  ],
  Physis: [
    "Antritt",
    "Ausdauer",
    "Balance",
    "Beweglichkeit",
    "Grundfitness",
    "Kraft",
    "Schnelligkeit",
    "Sprunghoehe",
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
};

export const AttributeGrid = ({ role }: { role: RoleWithKey | undefined }) => {
  const { settings, setSettings } = useContext(AppContext);
  const roleValues = role?.key
    ? settings.userRoleWeights[role.key]
    : defaultAttributes;
  const updateAttributeInRole = (
    key: keyof RoleAttributeWeights,
    stringValue: string
  ) => {
    const roleWeights = settings.userRoleWeights;
    const selectedRoleWeight = role?.key && roleWeights[role.key];
    const value = parseFloat(stringValue);
    if (!selectedRoleWeight) {
      return;
    }
    selectedRoleWeight[key] = value;
    const updatedRoleWeights = {
      ...roleWeights,
      [role.key]: { ...selectedRoleWeight, [key]: value },
    };
    console.log(updatedRoleWeights);
    setSettings({ userRoleWeights: updatedRoleWeights });
  };

  return (
    <Flex gap="3">
      <DataList.Root>
        {groupedAttributes.Technik.map((item) => {
          const key = item as keyof RoleAttributeWeights;
          const value = roleValues[key];
          return (
            <DataList.Item>
              <DataList.Label>{key}</DataList.Label>
              <DataList.Value>
                <TextField.Root
                  disabled={!role?.key}
                  size="1"
                  placeholder="Decimals for calculated numbers"
                  onChange={(e) => updateAttributeInRole(key, e.target.value)}
                  value={value}
                />
              </DataList.Value>
            </DataList.Item>
          );
        })}
      </DataList.Root>
      <DataList.Root>
        {groupedAttributes.Mental.map((item) => {
          const key = item as keyof RoleAttributeWeights;
          const value = roleValues[key];
          return (
            <DataList.Item>
              <DataList.Label>{key}</DataList.Label>
              <DataList.Value>
                <TextField.Root
                  disabled={!role?.key}
                  size="1"
                  placeholder="Decimals for calculated numbers"
                  value={value}
                />
              </DataList.Value>
            </DataList.Item>
          );
        })}
      </DataList.Root>
      <DataList.Root>
        {groupedAttributes.Physis.map((item) => {
          const key = item as keyof RoleAttributeWeights | undefined;
          const value = key && roleValues[key];
          return (
            <DataList.Item>
              <DataList.Label>{key}</DataList.Label>
              {key && (
                <DataList.Value>
                  <TextField.Root
                    disabled={!role?.key}
                    size="1"
                    placeholder="Decimals for calculated numbers"
                    value={value}
                  />
                </DataList.Value>
              )}
            </DataList.Item>
          );
        })}
      </DataList.Root>
    </Flex>
  );
};
