import { Stack } from "expo-router";
import {AuthProvider} from "../context/AuthContext";

export default function RootLayout() {
    return (
      <AuthProvider>
        <Stack>
            <Stack.Screen
                name="(main)"
                options={{
                    headerShown: false,
                }}
            />
          <Stack.Screen
            name="(ressources)/index"
            options={{
              title: 'Ressources',
              unmountOnBlur: true,
            }}
          />
        </Stack>
      </AuthProvider>
    );
}