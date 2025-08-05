import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import Button from "@/components/Button";
import { colors } from "@/constants/theme/colors";
import { textPresets } from "@/constants/theme/typography";
import { spacing } from "@/constants/theme/spacing";

const width = Dimensions.get("window").width;

type ModalButton = {
  label: string;
  onPress: () => void;
  preset?: "primary" | "filled" | "reversed";
  disabled?: boolean;
};

type AppModalProps = {
  visible: boolean;
  title: string;
  content?: string | JSX.Element;
  inputBox?: boolean;
  placeholderValue?: string;
  inputValue?: string;
  setInputValue?: (text: string) => void;
  buttons: ModalButton[];
  onClose: () => void;
};

export default function AppModal({
  visible,
  title,
  content,
  inputBox,
  placeholderValue,
  inputValue,
  setInputValue,
  buttons,
  onClose,
}: AppModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          {/* Title */}
          <Text style={textPresets.h2}>{title}</Text>

          {/* Content */}
          <View style={styles.modalContent}>
            {typeof content === "string" ? (
              <Text style={textPresets.h4regular}>{content}</Text>
            ) : (
              content
            )}

            {/* Optional Input Field */}
            {inputBox && (
              <TextInput
                style={styles.input}
                placeholder={placeholderValue}
                value={inputValue}
                onChangeText={setInputValue}
                textAlign="center"
                placeholderTextColor={colors.tint}
              />
            )}
          </View>

          {/* Buttons */}
          <View style={styles.modalButtons}>
            {buttons.map((button, index) => (
              <Button
                key={index}
                label={button.label}
                onPress={button.onPress}
                preset={button.preset || "primary"}
                disabled={button.disabled}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: colors.background,
    borderRadius: 4,
    padding: spacing.xl,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
    width: width * 0.75,
    gap: spacing.xs,
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: spacing.xs,
  },
  input: {
    height: 56,
    width: "100%",
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    color: colors.text,
  },
  modalButtons: {
    flexDirection: "row",
    gap: spacing.md,
  },
});
