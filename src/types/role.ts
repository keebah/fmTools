import { Attributes } from "./player";

export type Role = {
  primary: (keyof Attributes)[];
  secondary: (keyof Attributes)[];
  physis: "abwehr" | "mittelfeld" | "angriff";
};

export type Roles = { BBMu: Role };
