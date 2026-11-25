import "../../persistence/storage";

import * as Schema from "effect/Schema";
import * as Option from "effect/Option";
import type { WidgetTaskHandlerProps } from "react-native-android-widget";

import { SavedTitle } from "../watchlist/model";
import { renderUpNext } from "./UpNextWidget";

const decodeList = Schema.decodeUnknownOption(Schema.Array(SavedTitle));

// Runs without the app open, so it reads the saved list straight from storage.
const savedList = (): ReadonlyArray<SavedTitle> => {
  try {
    const raw = globalThis.localStorage.getItem("watchlist.list");
    return raw ? Option.getOrElse(decodeList(JSON.parse(raw)), () => []) : [];
  } catch {
    return [];
  }
};

export async function widgetTaskHandler({ widgetAction, renderWidget }: WidgetTaskHandlerProps) {
  if (widgetAction === "WIDGET_DELETED" || widgetAction === "WIDGET_CLICK") return;
  renderWidget(renderUpNext(savedList()));
}
