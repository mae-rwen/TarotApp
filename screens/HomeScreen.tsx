import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { spacing } from "@/constants/theme/spacing";
import { textPresets } from "@/constants/theme/typography";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={textPresets.h1s}>Tarot App</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: spacing.lg },
});
