import { Text, View, Button, Alert } from "react-native";

function pulsar() {
  alert("Botón pulsado")
}


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <Text>Hola mundo!</Text>
    <Button title="Inicio" onPress={() => Alert.alert('¡Hola Mundo!')} />
    </View>
  );
}


//También se puede hacer declarando una función y después poner: <Button title="Inicio" onPress={pulsar}/>

