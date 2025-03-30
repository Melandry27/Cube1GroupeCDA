import React from "react";
import { Text, TextStyle, StyleProp, TextProps } from "react-native";
import { useFonts } from "expo-font";

type TitleProps = {
    size?: "small" | "medium" | "large";
    children: React.ReactNode;
    style?: StyleProp<TextStyle>;
};

const Title: React.FC<TitleProps> = ({ size = "medium", children, style }) => {
    const [fontsLoaded] = useFonts({
        "Marianne-Bold": require("../../assets/fonts/Marianne/Marianne-Bold.otf"),
    });

    if (!fontsLoaded) {
        return null; // Évite d'afficher le texte si la police n'est pas encore prête
    }

    const getFontSize = (): TextStyle => {
        switch (size) {
            case "small":
                return { fontSize: 18 };
            case "medium":
                return { fontSize: 24 };
            case "large":
                return { fontSize: 32 };
            default:
                return { fontSize: 24 };
        }
    };

    const textStyle: StyleProp<TextStyle> = [
        getFontSize(),
        { fontFamily: "Marianne-Bold" },
        style
    ];

    return <Text style={textStyle}>{children}</Text>;
};

export default Title;
