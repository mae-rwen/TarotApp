import { StyleSheet, Pressable, Text } from "react-native";
import { colors } from "@/constants/theme/colors";
import { textPresets } from "@/constants/theme/typography";
import { spacing } from "@/constants/theme/spacing";

type ButtonProps = {
  label: string;
  preset?: "primary" | "filled" | "reversed";
  onPress?: () => void;
  disabled?: boolean;
};

export default function Button({
  label,
  preset = "primary",
  onPress,
  disabled = false,
}: ButtonProps) {
  return (
    <Pressable
      style={[
        styles.buttonContainer,
        styles[`${preset}BG`],
        disabled && styles.disabledBG,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          textPresets.copyBold,
          styles[`${preset}Tx`],
          disabled && styles.disabledTx,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    minWidth: 130,
    minHeight: 68,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 2,
  },
  primaryBG: {
    backgroundColor: colors.palette.secondary200,
    borderColor: colors.primary,
  },
  primaryTx: {
    color: colors.primary,
  },
  filledBG: {
    backgroundColor: colors.palette.main500,
    borderColor: colors.palette.main500,
  },
  filledTx: {
    color: colors.palette.secondary100,
  },
  reversedBG: {
    backgroundColor: colors.palette.accent500,
    borderColor: colors.palette.accent500,
  },
  reversedTx: {
    color: colors.palette.secondary100,
  },
  disabledBG: {
    opacity: 0.5,
  },
  disabledTx: {
    color: colors.accent,
  },
});
