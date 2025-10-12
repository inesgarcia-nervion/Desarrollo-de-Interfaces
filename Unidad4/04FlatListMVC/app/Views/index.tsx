import React from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { IndexVM } from "../ViewModels/IndexVM";
import { Personas } from "../Models/Entities/PersonaModel";


    const IndexView: React.FC = () => {
        const vm = new IndexVM();
        const personas = vm.getPersonas();
        const [personaSeleccionada, setPersonaSeleccionada] = React.useState<Personas | null>(null);
    
        return (
          <View style={styles.container}>
            <FlatList
              data={personas}
              keyExtractor={item => item.getId().toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <TouchableOpacity onPress={() => setPersonaSeleccionada(item)}>
                    <Text style={styles.texto}>{item.getNombre()}, {item.getApellidos()}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            {personaSeleccionada && (
              <View style={styles.containerAbajo}>
                <Text style={styles.textoContainerAbajo}>ID: {personaSeleccionada.getId()}</Text>
                <Text style={styles.textoContainerAbajo}>Nombre: {personaSeleccionada.getNombre()}</Text>
                <Text style={styles.textoContainerAbajo}>Apellidos: {personaSeleccionada.getApellidos()}</Text>
              </View>
            )}
          </View>
        );
    };
    
    export default IndexView;
  



//#region styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    alignItems: 'center', 
    margin: 10,  
  },
  texto:{
    color:'purple',
    fontSize: 20,
  },
  containerAbajo:{
    alignItems: 'center', 
    margin: 10,
    backgroundColor: 'lightgrey',
    marginBottom: 50
  },
  textoContainerAbajo:{
    fontWeight: 'bold'
  }

});
//#endregion
