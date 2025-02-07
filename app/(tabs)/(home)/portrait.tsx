import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import PortraitScreen from "@/screens/PortraitScreen";
import { colors } from "@/constants/theme/colors";
import { spacing } from "@/constants/theme/spacing";

const portrait = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PortraitScreen />
    </ScrollView>
  );
};

export default portrait;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
});
