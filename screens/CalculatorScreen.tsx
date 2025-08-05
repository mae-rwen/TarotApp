import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { textPresets } from "@/constants/theme/typography";
import TarotCard from "@/components/TarotCard";
import { cardRegistry } from "@/assets/images/tarotCards/cardRegistry";
import { spacing } from "@/constants/theme/spacing";
import Button from "@/components/Button";
import AppModal from "@/components/AppModal";
import DatePicker from "@/components/DatePicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { colors } from "@/constants/theme/colors";

type userDetails = {
  birthdate: string;
  day: string;
  month: string;
  year: string;
};

type userData = Record<string, userDetails>;

const CalculatorScreen = () => {
  const [newTPmodalVisible, setNewTPmodalVisible] = useState<boolean>(false);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [confirmModalVisible, setConfirmModalVisible] =
    useState<boolean>(false);
  const [actionModalVisible, setActionModalVisible] = useState<boolean>(false);

  const [inputBoxValue, setInputBoxValue] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const [temporaryData, setTemporaryData] = useState<{
    name: string;
    details: userDetails;
  } | null>(null);
  const [savedData, setSavedData] = useState<
    {
      name: string;
      details: userDetails;
    }[]
  >([]);
  const [selectedUser, setSelectedUser] = useState<{
    name: string;
    details: userDetails;
  } | null>(null);

  const fetchData = async () => {
    try {
      const existingData = await AsyncStorage.getItem("tppData");
      if (existingData) {
        const parsedData: userData = JSON.parse(existingData);

        // Map data into a format suitable for rendering
        const formattedData = Object.entries(parsedData).map(
          ([name, details]) => ({
            name,
            details,
          })
        );
        setSavedData(formattedData);
      } else {
        console.log("No existing data found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const cancel = () => {
    setNewTPmodalVisible(false);
    setDatePickerVisible(false);
    setConfirmModalVisible(false);
    setTemporaryData(null);
    setInputBoxValue("");
    setSelectedUser(null);
    setActionModalVisible(false);
    console.log("Cancelled all modals and reset state");
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Reset any state or perform any actions needed when the screen is focused
      cancel();
      return () => {
        // Cleanup if needed when the screen is unfocused
      };
    }, [])
  );

  const formatDate = (
    date: Date
  ): { formatted: string; dd: string; mm: string; yyyy: string } => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const yyyy = String(date.getFullYear());
    return { formatted: `${dd}.${mm}.${yyyy}`, dd, mm, yyyy };
  };

  const newPortrait = () => {
    setNewTPmodalVisible(true);
    console.log("Create new portrait button pressed");
  };

  const saveNewPortrait = () => {
    setNewTPmodalVisible(false);
    setDatePickerVisible(true);
    console.log("Save name button pressed");
  };

  const onDateChange = async (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate && event.type === "set") {
      setDate(selectedDate);

      const formattedDate = formatDate(selectedDate);

      // Temporary data to confirm
      const tempData = {
        name: inputBoxValue,
        details: {
          birthdate: formattedDate.formatted,
          day: formattedDate.dd,
          month: formattedDate.mm,
          year: formattedDate.yyyy,
        },
      };

      setTemporaryData(tempData);
      setDatePickerVisible(false);
      setConfirmModalVisible(true);
      console.log("Date selected:", tempData);
    } else {
      cancel();
      console.log("Date selection cancelled or invalid");
    }
  };

  const saveData = async () => {
    if (temporaryData) {
      try {
        const existingData = await AsyncStorage.getItem("tppData");
        const parsedData = existingData ? JSON.parse(existingData) : {};
        parsedData[temporaryData.name] = temporaryData.details;
        await AsyncStorage.setItem("tppData", JSON.stringify(parsedData));

        setSavedData((prevData) => [...prevData, temporaryData]);
        const newPortrait = temporaryData;
        setTemporaryData(null);
        setConfirmModalVisible(false);
        setInputBoxValue("");

        router.push({
          pathname: "/portrait",
          params: { user: JSON.stringify(newPortrait) },
        });
        console.log("Data saved successfully:", newPortrait);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    }
  };

  const handleDataClick = (data: { name: string; details: userDetails }) => {
    setSelectedUser(data);
    setActionModalVisible(true);
    console.log("Data clicked:", data);
  };

  const goToPortrait = () => {
    router.push({
      pathname: "/portrait",
      params: { user: JSON.stringify(selectedUser) },
    });
    setActionModalVisible(false);
    console.log("Navigating to portrait for:", selectedUser);
  };

  return (
    <View style={styles.container}>
      <Text style={textPresets.h1s}>Tarot Psychological Portrait</Text>
      <View style={styles.contentBox}>
        <Text style={textPresets.copy}>
          Tarot Psychological Portrait is used to examine and analyze the innate
          potentials of a given individual, their talents and predispositions,
          the influences they were subjected to in childhood and to which they
          are susceptible in adult life.
        </Text>
        <Text style={textPresets.copy}>
          The best ways to realize emerging opportunities, significant and
          turning moments in life, as well as those hidden in the subconscious
          fears, complexes or, as it is called in esoteric language - things to
          work through.
        </Text>
        <Text style={textPresets.copy}>
          Using the archetypes written in the Major Arcana of the Tarot,
          substituting the appropriate cards for the numbers resulting from the
          date of birth allows one to see something like a genetic code with
          which a person comes into the world.
        </Text>
        <Text style={textPresets.copy}>
          This method, created by Alla Alicja Chrzanowska is taught in
          workshops, and the meaning of each item is explained thoroughly during
          the course.
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <Button label="Create new portrait" onPress={newPortrait} />
      </View>
      <View style={styles.btnContainer}>
        {savedData.length > 0
          ? savedData.map((data, index) => (
              <Button
                key={index}
                preset="filled"
                label={data.name}
                onPress={() => handleDataClick(data)}
              />
            ))
          : null}
      </View>

      {/* Modal for setting new TPP */}
      <AppModal
        visible={newTPmodalVisible}
        title="Name for new portrait"
        inputBox={true}
        placeholderValue="Please give a name for the portrait"
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
            disabled: inputBoxValue.length < 3,
          },
          {
            label: "Cancel",
            onPress: () => {
              {
                cancel();
              }
            },
            preset: "reversed",
          },
        ]}
        onClose={() => setNewTPmodalVisible(false)}
      />

      {/* Modal for name & date confirmation */}
      <AppModal
        visible={confirmModalVisible}
        title="Save this data?"
        content={`${temporaryData?.name} ${temporaryData?.details.birthdate}`}
        buttons={[
          {
            label: "Save",
            onPress: () => {
              {
                saveData();
              }
            },
            preset: "filled",
          },
          {
            label: "Cancel",
            onPress: () => {
              {
                cancel();
              }
            },
            preset: "reversed",
          },
        ]}
        onClose={() => setConfirmModalVisible(false)}
      />

      {/* Action modal */}
      <AppModal
        visible={actionModalVisible}
        title="Portrait for"
        content={`${selectedUser?.name} ${selectedUser?.details.birthdate}`}
        buttons={[
          {
            label: "See portrait",
            onPress: () => {
              {
                goToPortrait();
              }
            },
            preset: "filled",
          },
          {
            label: "Cancel",
            onPress: () => {
              {
                cancel();
              }
            },
            preset: "reversed",
          },
        ]}
        onClose={() => setActionModalVisible(false)}
      />

      {/* DatePicker Modal */}
      {datePickerVisible && <DatePicker value={date} onChange={onDateChange} />}
    </View>
  );
};

export default CalculatorScreen;

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: spacing.lg },
  contentBox: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.contentBox,
    borderRadius: 10,
  },
  btnContainer: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "baseline",
  },
});
