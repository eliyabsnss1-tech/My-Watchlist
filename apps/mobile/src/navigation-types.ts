export type WatchlistParamList = {
  WatchlistHome: undefined;
  Settings: undefined;
  Search: undefined;
  Details: { key: string };
  Stats: undefined;
  Deleted: undefined;
};

export type ElementScopeParamList = {
  ElementScopeHome: undefined;
  /** Atomic profile of one element, e.g. { sym: "Au" }. */
  Element: { sym: string };
};

export type RootParamList = {
  Home: undefined;
  Watchlist: undefined;
  ElementScope: undefined;
};
