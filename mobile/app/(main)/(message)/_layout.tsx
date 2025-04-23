import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        name: "chatScreen",
        headerTitle: "Chat",
        title: "chatScreen",
        headerShown: false,
      }}
    />
  );
}
