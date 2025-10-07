import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.texto}>HEADER</Text>
      </View>


      <View style={styles.content}>
        <View style={styles.izquierda}> </View>

        <View style={styles.central}>
          <Text style={styles.texto}>CONTENT</Text>
        </View>

        <View style={styles.derecha}> </View>

      </View>



      <View style={styles.footer}>
        <Text style={styles.texto}>FOOTER</Text>
      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,                          // Para que ocupe toda la pantalla
  },
  header: {
    flex: 0.2,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20
  },
  content: {
    flex: 4,
    flexDirection: 'row',    // izquierda - central - derecha
    alignItems: 'stretch',   // Los hijos ocupan toda la altura del padre
  },
  footer:{
    backgroundColor: 'lightpink',
    flex: 0.2,

    alignItems: 'center',
    justifyContent: 'center',
  },
  central:{
    backgroundColor: 'grey',
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  izquierda:{
    backgroundColor: 'darkblue',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  derecha:{
    backgroundColor: 'darkgreen',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto:{
    color:'purple',
  }



}
)