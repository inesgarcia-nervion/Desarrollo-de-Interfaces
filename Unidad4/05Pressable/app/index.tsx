import { View, Pressable, Text, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.contenedor}>
        <Pressable style={styles.boton}>
          <Text style={styles.texto}>Hola</Text>
        </Pressable>
        <Pressable style={styles.boton}>
          <Text style={styles.texto}>Que</Text>
        </Pressable>
        <Pressable style={styles.boton}>
          <Text style={styles.texto}>Tal</Text>
        </Pressable>
        <Pressable style={styles.boton}>
          <Text style={styles.texto}>Estas</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contenedor: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  boton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "lightgray",
    margin: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  texto: {
    color: "black",
    fontSize: 16,
  },
})
