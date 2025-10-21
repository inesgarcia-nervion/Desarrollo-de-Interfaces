import { useState } from "react";
import { Text, View, TextInput } from "react-native";


export default function Index() {
  const [texto, setTexto] = useState("");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextInput value={texto} onChangeText={setTexto} style={{borderWidth: 1, borderRadius: 10}}/>
      <Text>Has escrito: {texto}</Text>
    </View>
  );
}
