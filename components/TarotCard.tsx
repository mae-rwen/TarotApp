import { StyleSheet, type StyleProp, type ImageStyle } from "react-native";
import { Image } from "expo-image";

type TarotCardProps = {
  source: string;
  style?: StyleProp<ImageStyle>;
};

export default function TarotCard({ source, style }: TarotCardProps) {
  return <Image source={source} style={[styles.image, style]} />;
}

const styles = StyleSheet.create({
  image: {
    width: 762 / 2,
    height: 1280 / 2,
    borderRadius: 10,
  },
});
