import { Atom, Clapperboard, type LucideIcon } from "lucide-react-native";

/** Every app inside My Apps. Adding an app: add a screen to the drawer in navigation.tsx and an entry here. */
export interface Section {
  readonly route: "Watchlist" | "ElementScope";
  readonly title: string;
  readonly description: string;
  readonly icon: LucideIcon;
  /** Tile gradient, top-left to bottom-right. */
  readonly gradient: readonly [string, string];
}

export const SECTIONS: ReadonlyArray<Section> = [
  {
    route: "Watchlist",
    title: "Watchlist",
    description: "Movies & shows to watch",
    icon: Clapperboard,
    gradient: ["#4d8bff", "#1e46b8"],
  },
  {
    route: "ElementScope",
    title: "ElementScope",
    description: "What is anything made of?",
    icon: Atom,
    gradient: ["#2bc4e0", "#0f5a96"],
  },
];
