import { StyleSheet, type StyleProp, type ImageStyle } from "react-native";
import { Image } from "expo-image";

type TarotCardProps = {
  source: number;
  style?: StyleProp<ImageStyle>;
};

export default function TarotCard({ source, style }: TarotCardProps) {
  return <Image source={source} style={[styles.image, style]} />;
}

const styles = StyleSheet.create({
  image: {
    // width: 320,
    // height: 520,
    borderRadius: 10,
  },
});
