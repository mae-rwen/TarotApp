import { colors } from "@/constants/theme/colors";
import { spacing } from "@/constants/theme/spacing";
import CalculatorScreen from "@/screens/CalculatorScreen";
import { ScrollView, StyleSheet } from "react-native";

export default function Calculator() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CalculatorScreen />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
});
