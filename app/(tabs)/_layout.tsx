import { Icon } from "@/components/Icon";
import { colors } from "@/constants/theme/colors";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleAlign: "left",
        headerShadowVisible: false,
        headerTintColor: colors.tint,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon name="tarotCard" focused={focused} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="(calculator)"
        options={{
          title: "Calculator",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon name="crystalBall" focused={focused} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon name="magicBook" focused={focused} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
