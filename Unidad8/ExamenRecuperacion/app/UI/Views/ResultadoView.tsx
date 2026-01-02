import React from "react";
import { View, Text } from "react-native";

interface ResultadoProps {
    mensaje: string;
    }

    export const ResultadoView: React.FC<ResultadoProps> = ({ mensaje }) => {
    return (
        <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{mensaje}</Text>
        </View>
    );
};
