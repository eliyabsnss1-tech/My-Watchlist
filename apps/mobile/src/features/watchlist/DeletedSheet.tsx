import { useAtom, useAtomSet } from "@effect/atom-react";
import { History, RotateCcw } from "lucide-react-native";
import { Text, View } from "react-native";

import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { IconButton } from "../../components/ui/IconButton";
import { Poster } from "../../components/ui/Poster";
import { DragSheet } from "../../components/ui/DragSheet";
import { makeSnack, snackAtom } from "../../components/ui/Snackbar";
import { haptic } from "../../lib/haptics";
import { ago } from "../../lib/time";
import * as List from "./list";
import { DELETED_MAX } from "./model";
import { deletedAtom, listAtom } from "./state";
import { posterUri } from "./TitleRow";

export function DeletedSheet() {
  const [deleted, setDeleted] = useAtom(deletedAtom);
  const setList = useAtomSet(listAtom);
  const setSnack = useAtomSet(snackAtom);

  return (
    <DragSheet
      title="Recently deleted"
      subtitle={`The last ${DELETED_MAX} titles you deleted. Tap ↺ to put one back where it was.`}
    >
      {deleted.length ? (
        <View className="gap-2">
          {deleted.map((item) => (
            <View
              key={item.key}
              className="flex-row items-center gap-3 rounded-3xl bg-surface p-2.5"
            >
              <Poster uri={posterUri(item)} title={item.title} size="sm" />
              <View className="flex-1">
                <Text numberOfLines={1} className="text-[15px] font-semibold text-ink">
                  {item.title}
                </Text>
                <Text numberOfLines={1} className="mt-0.5 text-[12.5px] text-muted">
                  {item.type === "movie" ? "Movie" : "Show"} · was in{" "}
                  {item.watched ? "Watched" : "To watch"} · {ago(item.deletedAt)}
                </Text>
              </View>
              <IconButton
                icon={RotateCcw}
                label={`Restore ${item.title}`}
                tone="primary"
                size="sm"
                onPress={() => {
                  setList((l) => List.restore(l, item));
                  setDeleted((d) => d.filter((x) => x.key !== item.key));
                  haptic("success");
                  setSnack(
                    makeSnack({
                      kind: "info",
                      title: item.title,
                      message: `Restored to ${item.watched ? "Watched" : "To watch"}`,
                    }),
                  );
                }}
              />
            </View>
          ))}
          <Button
            className="mt-3"
            tone="danger"
            label="Clear this history"
            onPress={() => setDeleted([])}
          />
        </View>
      ) : (
        <EmptyState
          icon={History}
          title="Nothing deleted yet"
          body="Titles you delete show up here for a while."
        />
      )}
    </DragSheet>
  );
}
