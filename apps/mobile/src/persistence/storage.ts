// On native this installs a SQLite-backed `localStorage`; on web it does nothing and the browser's is used.
import "expo-sqlite/localStorage/install";
import { KeyValueStore } from "effect/persistence";

export const layer = KeyValueStore.layerStorage(() => globalThis.localStorage);
