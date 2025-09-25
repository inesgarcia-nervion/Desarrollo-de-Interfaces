import { Text, View, Button, Alert } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Text>Edit app/index.tsx to edit this screen.</Text>
    <Button title="Inicio" onPress={() => Alert.alert('¡Hola Mundo!')} />
    </View>
  );
}
