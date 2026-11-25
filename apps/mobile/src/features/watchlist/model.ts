import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";

const orDefault = <S extends Schema.Constraint>(schema: S, value: S["Encoded"]) =>
  Schema.withDecodingDefault<S>(Effect.succeed(value))(schema);

export const MediaType = Schema.Literals(["movie", "tv"]);
export type MediaType = typeof MediaType.Type;

export const Source = Schema.Literals(["tmdb", "itunes", "tvmaze"]);
export type Source = typeof Source.Type;

/** [provider name, logo path on image.tmdb.org] */
export const ProviderEntry = Schema.Tuple([Schema.String, Schema.String]);

export const Availability = Schema.Struct({
  region: Schema.String,
  link: orDefault(Schema.String, ""),
  stream: orDefault(Schema.Array(ProviderEntry), []),
  free: orDefault(Schema.Array(ProviderEntry), []),
  rent: orDefault(Schema.Array(ProviderEntry), []),
  buy: orDefault(Schema.Array(ProviderEntry), []),
});
export type Availability = typeof Availability.Type;

/** A movie or show as the catalog (TMDB, iTunes, TVmaze) describes it. */
export const CatalogItem = Schema.Struct({
  key: Schema.String,
  src: orDefault(Source, "tmdb"),
  id: Schema.Number,
  type: MediaType,
  title: Schema.String,
  date: orDefault(Schema.String, ""),
  poster: orDefault(Schema.String, ""),
  posterBig: Schema.optional(Schema.String),
  rating: orDefault(Schema.Number, 0),
  overview: orDefault(Schema.String, ""),
  genres: orDefault(Schema.Array(Schema.String), []),
  runtime: orDefault(Schema.Number, 0),
  seasons: Schema.optional(Schema.Number),
  episodes: Schema.optional(Schema.Number),
  next: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  tagline: Schema.optional(Schema.String),
  trailer: Schema.optional(Schema.String),
  trailerUrl: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  channel: Schema.optional(Schema.String),
  prov: Schema.optional(Availability),
  refreshed: Schema.optional(Schema.Number),
  /** The movie series (TMDB collection) a movie belongs to; null once TMDB said it has none. */
  coll: Schema.optional(Schema.NullOr(Schema.Struct({ id: Schema.Number, name: Schema.String }))),
});
export type CatalogItem = typeof CatalogItem.Type;

/** A title saved in the watchlist. */
export const SavedTitle = Schema.Struct({
  ...CatalogItem.fields,
  added: orDefault(Schema.Number, 0),
  watched: orDefault(Schema.Boolean, false),
  watchedAt: Schema.optional(Schema.Number),
  myRating: orDefault(Schema.Number, 0),
});
export type SavedTitle = typeof SavedTitle.Type;

export const DeletedTitle = Schema.Struct({
  ...SavedTitle.fields,
  deletedAt: Schema.Number,
});
export type DeletedTitle = typeof DeletedTitle.Type;

export const SortOrder = Schema.Literals(["added", "date", "short", "long", "rating", "title"]);
export type SortOrder = typeof SortOrder.Type;

export const Settings = Schema.Struct({
  tmdbKey: orDefault(Schema.String, ""),
  region: orDefault(Schema.String, "IL"),
  lang: orDefault(Schema.Literals(["en-US", "he-IL"]), "en-US"),
  sort: orDefault(SortOrder, "added"),
});
export type Settings = typeof Settings.Type;

/** Backup file, compatible with the old web app's "Export backup". */
export const Backup = Schema.Struct({
  list: Schema.Array(Schema.Unknown),
  deleted: Schema.optional(Schema.Array(Schema.Unknown)),
});

export const DELETED_MAX = 15;

export const REGIONS: Readonly<Record<string, string>> = {
  IL: "Israel",
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  ES: "Spain",
  IT: "Italy",
  NL: "Netherlands",
};

export const SORT_LABELS: Readonly<Record<SortOrder, string>> = {
  added: "Recently added",
  date: "Newest release",
  short: "Shortest first",
  long: "Longest first",
  rating: "Top rated",
  title: "A–Z",
};
