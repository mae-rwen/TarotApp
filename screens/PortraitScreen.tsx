import { StyleSheet, Text, View } from "react-native";
import { cardRegistry } from "@/assets/images/tarotCards/cardRegistry";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { spacing } from "@/constants/theme/spacing";
import { textPresets } from "@/constants/theme/typography";
import TarotCard from "@/components/TarotCard";

type CardName = keyof typeof cardRegistry;

const calculateTarotCards = (day: string, month: string, year: string) => {
  const cardMap: CardName[] = [
    "magician",
    "priestess",
    "empress",
    "emperor",
    "hierophant",
    "lovers",
    "chariot",
    "justice",
    "hermit",
    "fortune",
    "strenght",
    "hanged",
    "death",
    "temperance",
    "devil",
    "tower",
    "star",
    "moon",
    "sun",
    "judgement",
    "world",
    "fool",
  ];

  const adjustCardNumber = (num: number) => {
    while (num > 22) num -= 22;
    if (num === 0) num = 22;
    return num;
  };

  // Life Card
  const allDigits = `${day}${month}${year}`.split("").map(Number);
  const lifeSum = adjustCardNumber(
    allDigits.reduce((acc, num) => acc + num, 0)
  );
  const lifeCard = cardMap[lifeSum - 1];

  const dayNumber = Number(day);
  const monthNumber = Number(month);
  const yearDigits = year.split("").map(Number);

  // Card numbers for day, month, and year
  const card1Number = adjustCardNumber(dayNumber);
  const card2Number = adjustCardNumber(monthNumber);
  const card3Number = adjustCardNumber(
    yearDigits.reduce((acc, num) => acc + num, 0)
  );

  // Card numbers for the rest of the cards
  const card4Number = adjustCardNumber(card1Number + card2Number);
  const card5Number = adjustCardNumber(card2Number + card3Number);
  const card6Number = adjustCardNumber(card5Number + card4Number);
  const card7Number = adjustCardNumber(card1Number + card5Number);
  const card8Number = adjustCardNumber(card2Number + card6Number);
  const card12Number = adjustCardNumber(card7Number + card8Number);
  const card13Number = adjustCardNumber(
    card1Number + card4Number + card6Number
  );
  const card13PlusNumber = adjustCardNumber(card13Number + card1Number);
  const card13MinusNumber = adjustCardNumber(
    card13Number > card1Number
      ? card13Number - card1Number
      : card1Number - card13Number
  );
  const card14Number = adjustCardNumber(
    card3Number + card5Number + card6Number
  );
  const card14PlusNumber = adjustCardNumber(card14Number + card3Number);
  const card14MinusNumber = adjustCardNumber(
    card14Number > card3Number
      ? card14Number - card3Number
      : card3Number - card14Number
  );

  // Map card numbers to names
  const card1 = cardMap[card1Number - 1];
  const card2 = cardMap[card2Number - 1];
  const card3 = cardMap[card3Number - 1];
  const card4 = cardMap[card4Number - 1];
  const card5 = cardMap[card5Number - 1];
  const card6 = cardMap[card6Number - 1];
  const card7 = cardMap[card7Number - 1];
  const card8 = cardMap[card8Number - 1];
  const card12 = cardMap[card12Number - 1];
  const card13 = cardMap[card13Number - 1];
  const card13Plus = cardMap[card13PlusNumber - 1];
  const card13Minus = cardMap[card13MinusNumber - 1];
  const card14 = cardMap[card14Number - 1];
  const card14Plus = cardMap[card14PlusNumber - 1];
  const card14Minus = cardMap[card14MinusNumber - 1];

  return {
    lifeCard,
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card12,
    card13,
    card13Plus,
    card13Minus,
    card14,
    card14Plus,
    card14Minus,
  };
};

const PortraitScreen = () => {
  const { user } = useLocalSearchParams();
  const userData = user ? JSON.parse(user as string) : null;

  const [lifeCard, setLifeCard] = useState<CardName>("revers");
  const [card1, setCard1] = useState<CardName>("revers");
  const [card2, setCard2] = useState<CardName>("revers");
  const [card3, setCard3] = useState<CardName>("revers");
  const [card4, setCard4] = useState<CardName>("revers");
  const [card5, setCard5] = useState<CardName>("revers");
  const [card6, setCard6] = useState<CardName>("revers");
  const [card7, setCard7] = useState<CardName>("revers");
  const [card8, setCard8] = useState<CardName>("revers");
  const [card13, setCard13] = useState<CardName>("revers");
  const [card13Plus, setCard13Plus] = useState<string>("plusik");
  const [card13Minus, setCard13Minus] = useState<string>("minusik");
  const [card12, setCard12] = useState<CardName>("revers");
  const [card14, setCard14] = useState<CardName>("revers");
  const [card14Plus, setCard14Plus] = useState<string>("plusik");
  const [card14Minus, setCard14Minus] = useState<string>("minusik");

  useEffect(() => {
    if (userData?.details) {
      const { day, month, year } = userData.details;
      const {
        lifeCard,
        card1,
        card2,
        card3,
        card4,
        card5,
        card6,
        card7,
        card8,
        card12,
        card13,
        card13Plus,
        card13Minus,
        card14,
        card14Plus,
        card14Minus,
      } = calculateTarotCards(day, month, year);

      setLifeCard(lifeCard);
      setCard1(card1);
      setCard2(card2);
      setCard3(card3);
      setCard4(card4);
      setCard5(card5);
      setCard6(card6);
      setCard7(card7);
      setCard8(card8);
      setCard12(card12);
      setCard13(card13);
      setCard13Plus(card13Plus);
      setCard13Minus(card13Minus);
      setCard14(card14);
      setCard14Plus(card14Plus);
      setCard14Minus(card14Minus);
    }
  }, [userData]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Text style={textPresets.h2}>{userData?.name}</Text>
        <Text style={textPresets.h2regular}>{userData?.details.birthdate}</Text>
      </View>
      <View style={styles.lifeCardContainer}>
        <TarotCard source={cardRegistry[lifeCard]} style={styles.lifeCard} />
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.mainGrid}>
          <View style={styles.gridUpperRow}>
            <View style={styles.cardView}>
              <Text>{`+ ${card13Plus}`}</Text>
              <Text>{`- ${card13Minus}`}</Text>
              <TarotCard
                source={cardRegistry[card13]}
                style={styles.gridCard}
              />
              <Text>p13</Text>
            </View>
            <View style={styles.cardView}>
              <Text>{`+ ${card14Plus}`}</Text>
              <Text>{`- ${card14Minus}`}</Text>
              <TarotCard
                source={cardRegistry[card14]}
                style={styles.gridCard}
              />
              <Text>p14</Text>
            </View>
          </View>
          <View style={styles.gridRowOne}>
            <View style={styles.cardView}>
              <TarotCard source={cardRegistry[card1]} style={styles.gridCard} />
              <Text>p1</Text>
            </View>
            <View style={styles.cardView}>
              <TarotCard source={cardRegistry[card2]} style={styles.gridCard} />
              <Text>p2</Text>
            </View>
            <View style={styles.cardView}>
              <TarotCard source={cardRegistry[card3]} style={styles.gridCard} />
              <Text>p3</Text>
            </View>
          </View>
          <View style={styles.gridRowTwo}>
            <View style={styles.cardView}>
              <TarotCard source={cardRegistry[card4]} style={styles.gridCard} />
              <Text>p4</Text>
            </View>
            <View style={styles.cardView}>
              <TarotCard source={cardRegistry[card5]} style={styles.gridCard} />
              <Text>p5</Text>
            </View>
          </View>
          <View style={styles.gridRowThree}>
            <View style={styles.cardView}>
              <TarotCard source={cardRegistry[card6]} style={styles.gridCard} />
              <Text>p6</Text>
            </View>
          </View>
          <View style={styles.gridLowerRow}>
            <View style={styles.cardView}>
              <TarotCard source={cardRegistry[card8]} style={styles.gridCard} />
              <Text>p8</Text>
            </View>
          </View>
        </View>
        <View style={styles.sideGridContainer}>
          <View style={styles.cardView}>
            <TarotCard source={cardRegistry[card7]} style={styles.gridCard} />
            <Text>p7</Text>
          </View>
          <View style={styles.cardView}>
            <TarotCard source={cardRegistry[card12]} style={styles.gridCard} />
            <Text>p12</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PortraitScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.lg,
  },
  userContainer: {
    alignItems: "center",
  },
  lifeCardContainer: { alignItems: "center" },
  lifeCard: {
    width: (762 / 2) * 0.3,
    height: (1280 / 2) * 0.3,
  },
  gridCard: { width: (762 / 2) * 0.15, height: (1280 / 2) * 0.15 },
  cardView: { alignItems: "center" },

  gridContainer: { paddingHorizontal: spacing.xxl, flexDirection: "row" },
  mainGrid: { gap: spacing.sm },
  gridUpperRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridRowOne: { flexDirection: "row", justifyContent: "space-around" },
  gridRowTwo: { flexDirection: "row", justifyContent: "space-evenly" },
  gridRowThree: { flexDirection: "row", justifyContent: "center" },
  gridLowerRow: { flexDirection: "row", justifyContent: "center" },
  sideGridContainer: {
    paddingTop: spacing.xxxl,
    gap: spacing.md,
    justifyContent: "space-evenly",
  },
});
