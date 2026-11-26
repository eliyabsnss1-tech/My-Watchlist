/** One provider as TMDB lists it for a region. */
interface Provider {
  readonly provider_name: string;
  readonly logo_path?: string | null | undefined;
}

const MIN_COUNTRIES = 8;
const MIN_SHARE = 0.4;

/**
 * Streaming services TMDB doesn't track in `region` at all (e.g. Disney+ in Israel), but that
 * stream this title in most countries that do have data. Services TMDB does track in the region
 * are never guessed: their catalogs really differ by country.
 */
export const likelyProviders = (
  byRegion: Readonly<
    Record<string, { readonly flatrate?: ReadonlyArray<Provider> | null | undefined }>
  >,
  region: string,
  trackedInRegion: ReadonlySet<string>,
): Array<readonly [string, string]> => {
  const counts = new Map<string, { count: number; logo: string }>();
  let regionsWithStreaming = 0;
  for (const [code, data] of Object.entries(byRegion)) {
    if (code === region || !data.flatrate?.length) continue;
    regionsWithStreaming++;
    for (const p of data.flatrate) {
      const prev = counts.get(p.provider_name);
      counts.set(p.provider_name, { count: (prev?.count ?? 0) + 1, logo: p.logo_path ?? "" });
    }
  }
  return [...counts.entries()]
    .filter(
      ([name, { count }]) =>
        !trackedInRegion.has(name) &&
        count >= MIN_COUNTRIES &&
        count >= regionsWithStreaming * MIN_SHARE,
    )
    .sort((a, b) => b[1].count - a[1].count)
    .map(([name, { logo }]) => [name, logo] as const);
};
