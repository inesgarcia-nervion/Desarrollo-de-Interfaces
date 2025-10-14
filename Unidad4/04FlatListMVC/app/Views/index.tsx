import React from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import IndexVM from "../ViewModels/IndexVM";  

const IndexView: React.FC = () => {
  const vm = new IndexVM();

  
//alert(vm.Personas.length)
  return (
    <View style={styles.container}>
      <FlatList
        data={vm.Personas}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => vm.PersonaSeleccionada = item}>
              <Text style={styles.texto}>{item.Nombre}, {item.Apellidos}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};


export default IndexView;

//#region styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30
  },
  item: {
    alignItems: 'center',
    margin: 10,
  },
  texto: {
    color: 'purple',
    fontSize: 20,
  }
});
//#endregion
