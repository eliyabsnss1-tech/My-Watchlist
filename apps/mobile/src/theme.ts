// Raw values for places that can't take a className (navigation, icons, gradients, Reanimated).
// Keep in step with src/global.css.
export const colors = {
  bg: "#050d24",
  surface: "#0b1838",
  surface2: "#12224a",
  surface3: "#1a2f5e",
  line: "#1f3566",
  ink: "#eef3ff",
  muted: "#8fa2cc",
  primary: "#3b7cff",
  primaryStrong: "#2a62e8",
  onPrimary: "#ffffff",
  accent: "#7cc6ff",
  ok: "#34d399",
  danger: "#ff6b81",
  star: "#ffc857",
  scrim: "rgba(2, 6, 20, 0.6)",
} as const;

// Material 3 motion tokens (Android's standard easing curves).
export const motion = {
  standard: [0.2, 0, 0, 1],
  standardDecelerate: [0, 0, 0, 1],
  emphasizedDecelerate: [0.05, 0.7, 0.1, 1],
  emphasizedAccelerate: [0.3, 0, 0.8, 0.15],
} as const;
