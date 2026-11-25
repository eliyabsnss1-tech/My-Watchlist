import { FlexWidget, TextWidget } from "react-native-android-widget";

import { fmtDate, fmtRuntime } from "../../lib/time";
import type { SavedTitle } from "../watchlist/model";
import { upNext } from "../watchlist/reminders";

// Widgets draw outside React Native, so colors are spelled out (same as theme.ts).
const C = {
  bg: "#02050d",
  surface: "#08101f",
  ink: "#eef3ff",
  muted: "#8fa2cc",
  primary: "#3b7cff",
} as const;

const meta = (x: SavedTitle) =>
  x.type === "movie"
    ? ["Movie", fmtRuntime(x.runtime)].filter(Boolean).join(" · ")
    : ["Show", x.next ? `Next episode ${fmtDate(x.next)}` : ""].filter(Boolean).join(" · ");

/** Home-screen widget: the next titles to watch, and a button to add one. */
export function UpNextWidget({ items }: { readonly items: ReadonlyArray<SavedTitle> }) {
  return (
    <FlexWidget
      clickAction="OPEN_URI"
      clickActionData={{ uri: "myapps://watchlist" }}
      style={{
        height: "match_parent",
        width: "match_parent",
        flexDirection: "column",
        backgroundColor: C.bg,
        borderRadius: 24,
        padding: 12,
        flexGap: 6,
      }}
    >
      <FlexWidget
        style={{
          width: "match_parent",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 4,
        }}
      >
        <FlexWidget style={{ flex: 1 }}>
          <TextWidget text="Up next" style={{ fontSize: 17, fontWeight: "700", color: C.ink }} />
        </FlexWidget>
        <FlexWidget
          clickAction="OPEN_URI"
          clickActionData={{ uri: "myapps://watchlist/add" }}
          style={{
            backgroundColor: C.primary,
            borderRadius: 16,
            paddingHorizontal: 12,
            paddingVertical: 5,
          }}
        >
          <TextWidget text="+ Add" style={{ fontSize: 14, fontWeight: "700", color: "#ffffff" }} />
        </FlexWidget>
      </FlexWidget>
      {items.length ? (
        items.map((x) => (
          <FlexWidget
            key={x.key}
            clickAction="OPEN_URI"
            clickActionData={{ uri: `myapps://watchlist/title/${encodeURIComponent(x.key)}` }}
            style={{
              width: "match_parent",
              flexDirection: "column",
              backgroundColor: C.surface,
              borderRadius: 16,
              paddingHorizontal: 12,
              paddingVertical: 7,
            }}
          >
            <TextWidget
              text={x.title}
              maxLines={1}
              truncate="END"
              style={{ fontSize: 15, fontWeight: "600", color: C.ink }}
            />
            <TextWidget
              text={meta(x)}
              maxLines={1}
              truncate="END"
              style={{ fontSize: 12, color: C.muted }}
            />
          </FlexWidget>
        ))
      ) : (
        <TextWidget
          text="Nothing to watch yet. Tap + Add."
          style={{ fontSize: 14, color: C.muted, paddingLeft: 4, paddingTop: 6 }}
        />
      )}
    </FlexWidget>
  );
}

export const WIDGET_ITEMS = 3;

export const renderUpNext = (list: ReadonlyArray<SavedTitle>) => (
  <UpNextWidget items={upNext(list, WIDGET_ITEMS)} />
);
