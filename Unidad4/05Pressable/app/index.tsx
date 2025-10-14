import { Pressable, Text, View } from "react-native";

function Boton({ texto }: { texto: string }) {
  return (
    <Pressable
      onPress={() => alert(`Hola: ${texto}`)}
      style={{
        backgroundColor: "#ddd",
        padding: 10,
        margin: 5,
        borderRadius: 5,
      }}
    >
      <Text>{texto}</Text>
    </Pressable>
  );
}



export default function Index() { 
  return(
    <View
      style={{
          backgroundColor: "#ddd",
          padding: 10,
          margin: 5,
          borderRadius: 5,
      }}
    >
      <Boton texto="Hola"></Boton>
      <Boton texto="Que"></Boton>
      <Boton texto="Tal"></Boton>
      <Boton texto="Estas"></Boton>

    </View>
  )


}