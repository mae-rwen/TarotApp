import { colors } from "@/constants/theme/colors";
import { spacing } from "@/constants/theme/spacing";
import HomePageScreen from "@/screens/HomePageScreen";
import { ScrollView, StyleSheet } from "react-native";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HomePageScreen />
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
