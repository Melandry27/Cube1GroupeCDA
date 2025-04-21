import { Stack } from 'expo-router/stack'

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Ressources",
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    title: "Ressource",
                    // headerShown: false,
                }}
            />
        </Stack>
    )
}