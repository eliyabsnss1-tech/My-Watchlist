import * as Layer from "effect/Layer";
import { FetchHttpClient } from "effect/http";
import { Atom } from "effect/reactivity";

import * as Catalog from "../features/watchlist/Catalog";
import * as Storage from "../persistence/storage";

const appLayer = Layer.mergeAll(Storage.layer, Catalog.layer).pipe(
  Layer.provide(FetchHttpClient.layer),
);

export const runtime = Atom.runtime(appLayer);
