import { Image } from "expo-image";
import { Text, View } from "react-native";

const SIZES = {
  sm: { width: 44, height: 66, radius: 10, font: 18 },
  md: { width: 54, height: 81, radius: 12, font: 22 },
  tile: { width: 96, height: 144, radius: 14, font: 32 },
  lg: { width: 116, height: 174, radius: 20, font: 40 },
  hero: { width: 168, height: 252, radius: 22, font: 56 },
} as const;

export interface PosterProps {
  readonly uri: string;
  readonly title: string;
  readonly size?: keyof typeof SIZES;
}

export function Poster({ uri, title, size = "md" }: PosterProps) {
  const s = SIZES[size];
  const box = { width: s.width, height: s.height, borderRadius: s.radius };
  if (!uri) {
    return (
      <View style={box} className="items-center justify-center bg-surface-3">
        <Text style={{ fontSize: s.font }} className="font-bold text-muted">
          {title.trim().charAt(0).toUpperCase() || "?"}
        </Text>
      </View>
    );
  }
  return (
    <Image source={{ uri }} style={box} contentFit="cover" transition={150} recyclingKey={uri} />
  );
}
