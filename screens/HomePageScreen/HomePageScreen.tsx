import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { textPresets } from "@/constants/theme/typography";
import TarotCard from "@/components/TarotCard";
import { cardRegistry } from "@/assets/images/tarotCards/cardRegistry";
import { spacing } from "@/constants/theme/spacing";
import Button from "@/components/Button";

import AppModal from "@/components/AppModal";
import DatePicker from "@/components/DatePicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

const HomePageScreen = () => {
  const [newTPmodalVisible, setNewTPmodalVisible] = useState<boolean>(false);
  const [inputBoxValue, setInputBoxValue] = useState("");
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const newPortrait = () => {
    setNewTPmodalVisible(true);
  };
  const saveNewPortrait = () => {
    console.log("Save btn clicked");
    setNewTPmodalVisible(false);
    setDatePickerVisible(true);
  };
  const cancelNewPortrait = () => {
    console.log("Cancel btn clicked");
    setNewTPmodalVisible(false);
    setInputBoxValue("");
  };

  const onDateChange = async (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate && event.type === "set") {
      setDate(selectedDate);
      console.log(selectedDate);
      setDatePickerVisible(false);
    } else {
      setDatePickerVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={textPresets.h1}>Tarot App</Text>
      <TarotCard source={cardRegistry.revers} style={styles.welcomeCard} />
      <View style={styles.btnContainer}>
        <Button label="Create a portrait" onPress={newPortrait} />
      </View>

      {/* Modal for setting new TPP */}
      <AppModal
        visible={newTPmodalVisible}
        title="Name for new portrait"
        inputBox={true}
        placeholderValue="Name for new TPP"
        inputValue={inputBoxValue}
        setInputValue={setInputBoxValue}
        buttons={[
          {
            label: "Save",
            onPress: () => {
              {
                saveNewPortrait();
              }
            },
            preset: "filled",
          },
          {
            label: "Cancel",
            onPress: () => {
              {
                cancelNewPortrait();
              }
            },
            preset: "reversed",
          },
        ]}
        onClose={() => setNewTPmodalVisible(!newTPmodalVisible)}
      />

      {/* DatePicker Modal */}

      {datePickerVisible && <DatePicker value={date} onChange={onDateChange} />}
    </View>
  );
};

export default HomePageScreen;

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: spacing.lg },
  welcomeCard: { width: 320, height: 520 },
  btnContainer: {},
});
