import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { spacing } from "@/constants/theme/spacing";
import { textPresets } from "@/constants/theme/typography";
import TarotCard from "@/components/TarotCard";
import { cardRegistry } from "@/assets/images/tarotCards/cardRegistry";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={textPresets.h1s}>Tarot App</Text>
      <TarotCard source={cardRegistry.revers} style={styles.welcomeCard} />
      <View style={styles.contentContainer}>
        <Text style={textPresets.copy}> More to be added</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: spacing.lg },
  welcomeCard: {
    width: (762 / 2) * 0.75,
    height: (1280 / 2) * 0.75,
  },
  contentContainer: {
    paddingVertical: spacing.md,
  },
});
