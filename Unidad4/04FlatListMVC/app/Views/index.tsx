import { Text, View, FlatList, StyleSheet } from "react-native";
import { IndexVM } from "../ViewModels/IndexVM";
import { Personas } from "../Models/Entities/PersonaModel";


export default function Index() {
    const vm = new IndexVM();
    const personas = vm.getPersonas();
  
  
  
    return (
    <View style= {styles.container}>
    <FlatList
      data={personas}
      keyExtractor={item => item.Id}
      renderItem={({ item }) => (
        <View style= {styles.item}>
          <Text style= {styles.texto}>{item.Nombre}, {item.Apellidos}</Text>
        </View>
      )}
    />
    </View>
  );
}




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
  }

}
)
//#endregion
