import { Stack } from 'expo-router/stack'

export default function Layout() {
  return (

    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Messagerie",
          headerShown: false,
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        options={{
          title: "Message",
          headerBackVisible: true,
          headerShown: true,
        }}
      />
    </Stack>
  );
}