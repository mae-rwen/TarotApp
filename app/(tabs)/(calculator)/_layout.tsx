import { Stack } from "expo-router";

export default function CalculatorLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="calculator"
        options={{ title: "Calculator", headerShown: false }}
      />
      <Stack.Screen
        name="portrait"
        options={({ route }) => ({
          title: route.params?.user
            ? `Portrait for ${JSON.parse(route.params.user).name}`
            : "Portrait",
          headerShown: true,
        })}
      />
    </Stack>
  );
}
