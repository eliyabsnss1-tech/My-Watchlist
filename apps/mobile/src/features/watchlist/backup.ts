import * as DocumentPicker from "expo-document-picker";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as Option from "effect/Option";
import * as Schema from "effect/Schema";
import { Platform } from "react-native";

import { todayIso } from "../../lib/time";
import { Backup, type DeletedTitle, type SavedTitle } from "./model";

const decodeBackup = Schema.decodeUnknownOption(Schema.fromJsonString(Backup));

/** Picks a backup file (this app's or the old website's) and returns its raw titles, or undefined if cancelled/invalid. */
export async function pickBackup(): Promise<ReadonlyArray<unknown> | "invalid" | undefined> {
  const picked = await DocumentPicker.getDocumentAsync({
    type: ["application/json", "*/*"],
    copyToCacheDirectory: true,
  });
  if (picked.canceled) return undefined;
  const asset = picked.assets[0];
  if (!asset) return undefined;
  const text = Platform.OS === "web" ? await asset.file?.text() : await new File(asset.uri).text();
  const backup = decodeBackup(text ?? "");
  return Option.isSome(backup) ? backup.value.list : "invalid";
}

export async function shareBackup(
  list: ReadonlyArray<SavedTitle>,
  deleted: ReadonlyArray<DeletedTitle>,
): Promise<boolean> {
  if (Platform.OS === "web" || !(await Sharing.isAvailableAsync())) return false;
  const file = new File(Paths.cache, `watchlist-backup-${todayIso()}.json`);
  if (file.exists) file.delete();
  file.create();
  file.write(JSON.stringify({ v: 2, exported: todayIso(), list, deleted }));
  await Sharing.shareAsync(file.uri, {
    mimeType: "application/json",
    dialogTitle: "Save your watchlist backup",
  });
  return true;
}
