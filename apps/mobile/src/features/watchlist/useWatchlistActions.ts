import { useAtomSet } from "@effect/atom-react";

import { makeSnack, snackAtom } from "../../components/ui/Snackbar";
import { haptic } from "../../lib/haptics";
import { nowMillis } from "../../lib/time";
import * as List from "./list";
import type { SavedTitle } from "./model";
import { deletedAtom, listAtom } from "./state";

/** List mutations shared by the list, details and recently-deleted screens. Each offers Undo. */
export function useWatchlistActions() {
  const setList = useAtomSet(listAtom);
  const setDeleted = useAtomSet(deletedAtom);
  const setSnack = useAtomSet(snackAtom);

  const toggleWatched = (item: SavedTitle, withUndo: boolean) => {
    setList((l) => List.toggleWatched(l, item.key, nowMillis()));
    haptic("medium");
    if (!withUndo) return;
    setSnack(
      makeSnack({
        kind: item.watched ? "unwatched" : "watched",
        title: item.title,
        undo: () => setList((l) => List.toggleWatched(l, item.key, nowMillis())),
      }),
    );
  };

  const remove = (item: SavedTitle) => {
    setList((l) => List.remove(l, item.key));
    setDeleted((d) => List.pushDeleted(d, item, nowMillis()));
    haptic("medium");
    setSnack(
      makeSnack({
        kind: "deleted",
        title: item.title,
        undo: () => {
          setList((l) => (l.some((x) => x.key === item.key) ? l : [...l, item]));
          setDeleted((d) => d.filter((x) => x.key !== item.key));
        },
      }),
    );
  };

  return { toggleWatched, remove };
}
