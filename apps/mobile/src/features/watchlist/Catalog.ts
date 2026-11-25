import * as Clock from "effect/Clock";
import * as Context from "effect/Context";
import * as DateTime from "effect/DateTime";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import { HttpClient, HttpClientResponse } from "effect/http";

import type { Availability, CatalogItem, MediaType, Settings } from "./model";

const opt = <S extends Schema.Constraint>(schema: S) => Schema.optional(Schema.NullOr(schema));

export class TmdbKeyRejectedError extends Schema.TaggedError<TmdbKeyRejectedError>()(
  "TmdbKeyRejectedError",
  {},
) {
  override get message(): string {
    return "TMDB rejected the API key.";
  }
}

export class CatalogRequestError extends Schema.TaggedError<CatalogRequestError>()(
  "CatalogRequestError",
  {
    source: Schema.Literals(["tmdb", "itunes", "tvmaze"]),
    cause: Schema.Defect(),
  },
) {
  override get message(): string {
    return `Could not reach ${this.source}.`;
  }
}

export interface SearchResult {
  readonly items: ReadonlyArray<CatalogItem>;
  /** Set when one of the free sources failed and results are partial. */
  readonly note: string;
}

const TmdbListItem = Schema.Struct({
  id: Schema.Number,
  media_type: opt(Schema.String),
  title: opt(Schema.String),
  name: opt(Schema.String),
  release_date: opt(Schema.String),
  first_air_date: opt(Schema.String),
  poster_path: opt(Schema.String),
  vote_average: opt(Schema.Number),
  overview: opt(Schema.String),
});
const TmdbList = Schema.Struct({ results: Schema.Array(TmdbListItem) });

const TmdbProvider = Schema.Struct({ provider_name: Schema.String, logo_path: opt(Schema.String) });
const TmdbRegion = Schema.Struct({
  link: opt(Schema.String),
  flatrate: opt(Schema.Array(TmdbProvider)),
  free: opt(Schema.Array(TmdbProvider)),
  ads: opt(Schema.Array(TmdbProvider)),
  rent: opt(Schema.Array(TmdbProvider)),
  buy: opt(Schema.Array(TmdbProvider)),
});
const TmdbDetails = Schema.Struct({
  id: Schema.Number,
  title: opt(Schema.String),
  name: opt(Schema.String),
  release_date: opt(Schema.String),
  first_air_date: opt(Schema.String),
  poster_path: opt(Schema.String),
  vote_average: opt(Schema.Number),
  overview: opt(Schema.String),
  tagline: opt(Schema.String),
  status: opt(Schema.String),
  runtime: opt(Schema.Number),
  episode_run_time: opt(Schema.Array(Schema.Number)),
  number_of_seasons: opt(Schema.Number),
  number_of_episodes: opt(Schema.Number),
  next_episode_to_air: opt(Schema.Struct({ air_date: opt(Schema.String) })),
  last_episode_to_air: opt(Schema.Struct({ runtime: opt(Schema.Number) })),
  genres: opt(Schema.Array(Schema.Struct({ name: Schema.String }))),
  belongs_to_collection: opt(Schema.Struct({ id: Schema.Number, name: opt(Schema.String) })),
  videos: opt(
    Schema.Struct({
      results: Schema.Array(
        Schema.Struct({
          key: Schema.String,
          site: Schema.String,
          type: Schema.String,
          official: opt(Schema.Boolean),
        }),
      ),
    }),
  ),
  "watch/providers": opt(Schema.Struct({ results: Schema.Record(Schema.String, TmdbRegion) })),
});

const ItunesResult = Schema.Struct({
  trackId: opt(Schema.Number),
  trackName: opt(Schema.String),
  kind: opt(Schema.String),
  releaseDate: opt(Schema.String),
  artworkUrl100: opt(Schema.String),
  longDescription: opt(Schema.String),
  shortDescription: opt(Schema.String),
  primaryGenreName: opt(Schema.String),
  trackTimeMillis: opt(Schema.Number),
  trackViewUrl: opt(Schema.String),
  previewUrl: opt(Schema.String),
});
const ItunesSearch = Schema.Struct({ results: Schema.Array(ItunesResult) });

const TvmazeShow = Schema.Struct({
  id: Schema.Number,
  name: Schema.String,
  premiered: opt(Schema.String),
  image: opt(Schema.Struct({ medium: opt(Schema.String), original: opt(Schema.String) })),
  rating: opt(Schema.Struct({ average: opt(Schema.Number) })),
  summary: opt(Schema.String),
  genres: opt(Schema.Array(Schema.String)),
  status: opt(Schema.String),
  averageRuntime: opt(Schema.Number),
  runtime: opt(Schema.Number),
  url: opt(Schema.String),
  webChannel: opt(Schema.Struct({ name: Schema.String })),
  network: opt(Schema.Struct({ name: Schema.String })),
  _embedded: opt(
    Schema.Struct({
      episodes: Schema.Array(
        Schema.Struct({ season: opt(Schema.Number), airdate: opt(Schema.String) }),
      ),
    }),
  ),
});
const TvmazeSearch = Schema.Array(Schema.Struct({ show: TvmazeShow }));

const https = (url: string | null | undefined) => (url ?? "").replace(/^http:/, "https:");
const stripHtml = (html: string | null | undefined) =>
  (html ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

const fromTmdbListItem = (r: typeof TmdbListItem.Type, type: MediaType): CatalogItem => ({
  src: "tmdb",
  key: `${type}-${r.id}`,
  id: r.id,
  type,
  title: r.title ?? r.name ?? "",
  date: r.release_date ?? r.first_air_date ?? "",
  poster: r.poster_path ?? "",
  rating: r.vote_average ?? 0,
  overview: r.overview ?? "",
  genres: [],
  runtime: 0,
});

const availability = (d: typeof TmdbDetails.Type, region: string): Availability => {
  const v = d["watch/providers"]?.results[region];
  const list = (a: ReadonlyArray<typeof TmdbProvider.Type> | null | undefined) =>
    (a ?? []).map((p) => [p.provider_name, p.logo_path ?? ""] as const);
  return {
    region,
    link: v?.link ?? "",
    stream: list(v?.flatrate),
    free: [...list(v?.free), ...list(v?.ads)],
    rent: list(v?.rent),
    buy: list(v?.buy),
  };
};

const fromTmdbDetails = (
  d: typeof TmdbDetails.Type,
  type: MediaType,
  region: string,
  now: number,
): Partial<CatalogItem> => {
  const vids = (d.videos?.results ?? []).filter((x) => x.site === "YouTube");
  const trailer =
    vids.find((x) => x.type === "Trailer" && x.official) ??
    vids.find((x) => x.type === "Trailer") ??
    vids.find((x) => x.type === "Teaser");
  const base = {
    title: d.title ?? d.name ?? "",
    date: d.release_date ?? d.first_air_date ?? "",
    poster: d.poster_path ?? "",
    rating: d.vote_average ?? 0,
    overview: d.overview ?? "",
    genres: (d.genres ?? []).map((g) => g.name),
    tagline: d.tagline ?? "",
    trailer: trailer?.key ?? "",
    status: d.status ?? "",
    prov: availability(d, region),
    refreshed: now,
  };
  if (type === "movie") {
    const c = d.belongs_to_collection;
    return { ...base, runtime: d.runtime ?? 0, coll: c ? { id: c.id, name: c.name ?? "" } : null };
  }
  return {
    ...base,
    runtime: d.episode_run_time?.[0] ?? d.last_episode_to_air?.runtime ?? 0,
    seasons: d.number_of_seasons ?? 0,
    episodes: d.number_of_episodes ?? 0,
    next: d.next_episode_to_air?.air_date ?? "",
  };
};

const fromItunes = (r: typeof ItunesResult.Type): CatalogItem => ({
  src: "itunes",
  key: `movie-i${r.trackId ?? 0}`,
  id: r.trackId ?? 0,
  type: "movie",
  title: r.trackName ?? "",
  date: (r.releaseDate ?? "").slice(0, 10),
  poster: https(r.artworkUrl100).replace(/\d+x\d+bb/, "300x450bb"),
  rating: 0,
  overview: r.longDescription ?? r.shortDescription ?? "",
  genres: r.primaryGenreName ? [r.primaryGenreName] : [],
  runtime: r.trackTimeMillis ? Math.round(r.trackTimeMillis / 60000) : 0,
  url: https(r.trackViewUrl),
  trailerUrl: https(r.previewUrl),
});

const fromTvmaze = (d: typeof TvmazeShow.Type, today: string, now: number): CatalogItem => {
  const eps = d._embedded?.episodes ?? [];
  const upcoming = eps
    .map((e) => e.airdate ?? "")
    .filter((a) => a >= today)
    .sort()[0];
  return {
    src: "tvmaze",
    key: `tv-m${d.id}`,
    id: d.id,
    type: "tv",
    title: d.name,
    date: d.premiered ?? "",
    poster: https(d.image?.medium),
    posterBig: https(d.image?.original),
    rating: d.rating?.average ?? 0,
    overview: stripHtml(d.summary),
    genres: d.genres ?? [],
    status: d.status ?? "",
    runtime: d.averageRuntime ?? d.runtime ?? 0,
    channel: d.webChannel?.name ?? d.network?.name ?? "",
    url: https(d.url) || `https://www.tvmaze.com/shows/${d.id}`,
    ...(eps.length
      ? {
          seasons: eps.reduce((m, e) => Math.max(m, e.season ?? 0), 0),
          episodes: eps.length,
          next: upcoming ?? "",
          refreshed: now,
        }
      : {}),
  };
};

const interleave = <A>(a: ReadonlyArray<A>, b: ReadonlyArray<A>): Array<A> => {
  const out: Array<A> = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const x = a[i];
    const y = b[i];
    if (x !== undefined) out.push(x);
    if (y !== undefined) out.push(y);
  }
  return out;
};

export class Catalog extends Context.Service<
  Catalog,
  {
    readonly search: (
      query: string,
      settings: Settings,
    ) => Effect.Effect<SearchResult, TmdbKeyRejectedError | CatalogRequestError>;
    readonly details: (
      item: CatalogItem,
      settings: Settings,
    ) => Effect.Effect<Partial<CatalogItem>, TmdbKeyRejectedError | CatalogRequestError>;
    readonly checkTmdbKey: (
      key: string,
    ) => Effect.Effect<void, TmdbKeyRejectedError | CatalogRequestError>;
    /** Titles TMDB recommends for one title ("more like this"). Empty without a TMDB key. */
    readonly recommendations: (
      item: CatalogItem,
      settings: Settings,
    ) => Effect.Effect<ReadonlyArray<CatalogItem>, TmdbKeyRejectedError | CatalogRequestError>;
  }
>()("mobile/features/watchlist/Catalog") {}

// Public APIs (TVmaze, iTunes) reject the CORS preflight that trace headers trigger on web.
const noTraceHeaders = <A, E, R>(self: Effect.Effect<A, E, R>) =>
  Effect.provideService(self, HttpClient.TracerPropagationEnabled, false);

const make = Effect.gen(function* () {
  const client = (yield* HttpClient.HttpClient).pipe(HttpClient.filterStatusOk);

  const tmdbGet = <S extends Schema.Constraint>(
    path: string,
    params: Record<string, string>,
    key: string,
    schema: S,
  ) => {
    const bearer = key.startsWith("eyJ");
    return client
      .get(`https://api.themoviedb.org/3${path}`, {
        urlParams: bearer ? params : { ...params, api_key: key },
        headers: bearer ? { Authorization: `Bearer ${key}` } : {},
      })
      .pipe(
        Effect.flatMap(HttpClientResponse.schemaBodyJson(schema)),
        noTraceHeaders,
        Effect.catchTags({
          HttpClientError: (cause) =>
            cause.response?.status === 401
              ? Effect.fail(new TmdbKeyRejectedError())
              : Effect.fail(new CatalogRequestError({ source: "tmdb", cause })),
          SchemaError: (cause) => Effect.fail(new CatalogRequestError({ source: "tmdb", cause })),
        }),
      );
  };

  const freeGet = <S extends Schema.Constraint>(
    source: "itunes" | "tvmaze",
    url: string,
    schema: S,
  ) =>
    client.get(url).pipe(
      Effect.flatMap(HttpClientResponse.schemaBodyJson(schema)),
      noTraceHeaders,
      Effect.mapError((cause) => new CatalogRequestError({ source, cause })),
    );

  const searchTmdb = Effect.fn("Catalog.searchTmdb")(function* (query: string, settings: Settings) {
    const data = query
      ? yield* tmdbGet(
          "/search/multi",
          { query, include_adult: "false", language: settings.lang },
          settings.tmdbKey,
          TmdbList,
        )
      : yield* tmdbGet(
          "/trending/all/week",
          { language: settings.lang },
          settings.tmdbKey,
          TmdbList,
        );
    const items = data.results.flatMap((r) =>
      r.media_type === "movie" || r.media_type === "tv" ? [fromTmdbListItem(r, r.media_type)] : [],
    );
    return { items: items.filter((x) => x.title), note: "" };
  });

  const searchFree = Effect.fn("Catalog.searchFree")(function* (query: string) {
    if (query.length < 2) return { items: [], note: "" };
    const now = yield* Clock.currentTimeMillis;
    const today = DateTime.formatIsoDateUtc(DateTime.makeUnsafe(now));
    const q = encodeURIComponent(query);
    const [movies, shows] = yield* Effect.all(
      [
        Effect.result(
          freeGet(
            "itunes",
            `https://itunes.apple.com/search?term=${q}&media=movie&entity=movie&limit=15&country=US`,
            ItunesSearch,
          ),
        ),
        Effect.result(
          freeGet("tvmaze", `https://api.tvmaze.com/search/shows?q=${q}`, TvmazeSearch),
        ),
      ],
      { concurrency: 2 },
    );
    if (movies._tag === "Failure" && shows._tag === "Failure") return yield* movies.failure;
    const movieItems =
      movies._tag === "Success"
        ? movies.success.results
            .filter((r) => r.trackId && (!r.kind || r.kind === "feature-movie"))
            .map(fromItunes)
        : [];
    const showItems =
      shows._tag === "Success"
        ? shows.success.slice(0, 10).map((x) => fromTvmaze(x.show, today, now))
        : [];
    const note =
      movies._tag === "Failure"
        ? "Movie results are unavailable right now, showing shows only."
        : shows._tag === "Failure"
          ? "Show results are unavailable right now, showing movies only."
          : "";
    return { items: interleave(movieItems, showItems), note };
  });

  const search = Effect.fn("Catalog.search")(function* (query: string, settings: Settings) {
    const q = query.trim();
    if (!settings.tmdbKey) return yield* searchFree(q);
    return yield* searchTmdb(q, settings).pipe(
      Effect.catchTags({ CatalogRequestError: () => searchFree(q) }),
    );
  });

  const details = Effect.fn("Catalog.details")(function* (item: CatalogItem, settings: Settings) {
    const now = yield* Clock.currentTimeMillis;
    if (item.src === "itunes") return {};
    if (item.src === "tvmaze") {
      const show = yield* freeGet(
        "tvmaze",
        `https://api.tvmaze.com/shows/${item.id}?embed=episodes`,
        TvmazeShow,
      );
      return fromTvmaze(show, DateTime.formatIsoDateUtc(DateTime.makeUnsafe(now)), now);
    }
    if (!settings.tmdbKey) return {};
    const d = yield* tmdbGet(
      `/${item.type}/${item.id}`,
      {
        language: settings.lang,
        append_to_response: "watch/providers,videos",
        include_video_language: `en,null,${settings.lang.slice(0, 2)}`,
      },
      settings.tmdbKey,
      TmdbDetails,
    );
    return fromTmdbDetails(d, item.type, settings.region, now);
  });

  const recommendations = Effect.fn("Catalog.recommendations")(function* (
    item: CatalogItem,
    settings: Settings,
  ) {
    if (!settings.tmdbKey || item.src !== "tmdb") return [];
    const get = (kind: "recommendations" | "similar") =>
      tmdbGet(
        `/${item.type}/${item.id}/${kind}`,
        { language: settings.lang },
        settings.tmdbKey,
        TmdbList,
      );
    const recommended = yield* get("recommendations");
    const data = recommended.results.length ? recommended : yield* get("similar");
    return data.results
      .map((r) =>
        fromTmdbListItem(
          r,
          r.media_type === "movie" || r.media_type === "tv" ? r.media_type : item.type,
        ),
      )
      .filter((x) => x.title && x.key !== item.key);
  });

  const checkTmdbKey = Effect.fn("Catalog.checkTmdbKey")(function* (key: string) {
    yield* tmdbGet("/configuration", {}, key, Schema.Unknown);
  });

  return Catalog.of({ search, details, checkTmdbKey, recommendations });
});

export const layer = Layer.effect(Catalog, make);
