import { Text, View, ScrollView, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.text}>
          En una pequeña aldea rodeada de montañas azules y ríos cristalinos, vivía un anciano llamado Elías. 
          Cada mañana, antes de que saliera el sol, Elías caminaba hasta el lago con una taza de té en la mano 
          y un cuaderno bajo el brazo. Nadie sabía exactamente qué escribía en esas páginas amarillas, pero todos 
          decían que contenían los secretos del bosque.

          Los niños del pueblo solían espiarlo desde lejos, imaginando que era un mago o quizás un guardián del tiempo. 
          Lo cierto es que Elías tenía una conexión especial con la naturaleza. Hablaba con los árboles, susurraba a los pájaros 
          y, según algunos, incluso podía predecir la lluvia con solo mirar el cielo.

          Un día, sin previo aviso, Elías desapareció. En su cabaña solo quedó el cuaderno, abierto en la última página. Las palabras 
          escritas eran simples, pero estremecedoras: “Cuando el viento cambie de dirección, sabrán dónde buscarme.”

          Desde entonces, cada vez que sopla un viento diferente, los aldeanos miran al horizonte, esperando ver a Elías volver 
          por el camino de piedra.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  text: {
    fontSize: 20,
    lineHeight: 30,
  },
});