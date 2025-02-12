import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { spacing } from "@/constants/theme/spacing";
import { textPresets } from "@/constants/theme/typography";
import TarotCard from "@/components/TarotCard";
import { cardRegistry } from "@/assets/images/tarotCards/cardRegistry";
import { colors } from "@/constants/theme/colors";
import * as Application from "expo-application";
import * as Linking from "expo-linking";

const AboutScreen = () => {
  const appVersionDisplay = `App-Version ${Application.nativeApplicationVersion}`;

  const linkToIcons = () => {
    Linking.openURL("https://www.flaticon.com/free-icons/magic-book");
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentBox}>
        <Text style={textPresets.copy}>More to come</Text>
        <Text style={textPresets.copy}>Icon used:</Text>
        <TouchableOpacity onPress={linkToIcons}>
          <Text style={textPresets.copy}>Magic icons provided by Flaticon</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={textPresets.copyBold}>© 2025 Agata R. Thrams</Text>
        <Text style={textPresets.copy}>{appVersionDisplay}</Text>
      </View>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: spacing.lg,
    justifyContent: "space-between",
  },
  contentBox: {
    alignItems: "center",
    width: "100%",
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
  },
  footer: {
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
  },
});
