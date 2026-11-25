import { createElement } from "react";

export function SiteView({ url }: { readonly url: string }) {
  // oxlint-disable-next-line react/iframe-missing-sandbox -- our own site; it needs its own storage and scripts, which a sandbox blocks.
  return createElement("iframe", {
    src: url,
    title: "ElementScope",
    style: { flex: 1, width: "100%", height: "100%", border: 0 },
  });
}
