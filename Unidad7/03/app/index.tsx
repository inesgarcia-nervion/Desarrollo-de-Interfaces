import { Text, View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import {useState, useRef} from "react";
// ref nos permite tener una referencia a un componente para poder manipularlo directamente después. (Como un mando a distancia)
// sin ref no podríamos decirle a FlatList que se desplace arriba.


// Para generar 100 elementos
const DATA = (() => {
  const lista = [];
  for (let i = 0; i < 100; i++) {
    lista.push({
      id: i.toString(),
      title: "Elemento " + (i + 1)
    });
  }
  return lista;
})();  // Los paréntesis hacen que la función se ejecute inmediatamente al arrancar la app. Si no estuvieran, DATA sería una función esperando ser llamada.


export default function Index() {
  const [showButton, setMostrarBoton] = useState(false);
  const flatListRef = useRef<FlatList>(null);   // Aquí tienes el mando en la mano, pero no funciona porque no está conectado a nada.
  const subirAlInicio = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true }); // offset: 0 para ir al principio
  }


  return (
    <View style={styles.container}>
      
      <FlatList
      ref={flatListRef} 
      data={DATA} 
      keyExtractor={(item) => item.id} 
      renderItem={({item}) => <Text>{item.title}</Text>}

      // AQUI detectamos el movimiento
        onScroll={(evento) => {
          // 'y' es cuántos píxeles hemos bajado
          const y = evento.nativeEvent.contentOffset.y;
          // Si y es mayor a 300, ponemos true. Si no, false.
          setMostrarBoton(y > 300);
        }}
      ></FlatList>

      {showButton && (    // Si showButton es true, mostramos el botón
        <TouchableOpacity onPress={subirAlInicio} style={styles.boton}>
          <Text style={styles.texto}>Subir arriba</Text>
        </TouchableOpacity> 
      )}
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boton: {
    position: "absolute",     // Para que flote sobre el contenido
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  texto:{
    color: "white",
    fontSize: 16,
  }
});