<<<<<<< HEAD
import { Text, View } from "react-native";
=======
import { Text, View, Button, Alert } from "react-native";
>>>>>>> 4bbc121316ae23b3809230a4c188e8825c1a6d1b

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
<<<<<<< HEAD
      <Text>Edit app/index.tsx to edit this screen.</Text>
=======
    <Text>Edit app/index.tsx to edit this screen.</Text>
    <Button title="Inicio" onPress={() => Alert.alert('¡Hola Mundo!')} />
>>>>>>> 4bbc121316ae23b3809230a4c188e8825c1a6d1b
    </View>
  );
}
