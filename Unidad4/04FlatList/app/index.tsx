import { Text, View, FlatList, StyleSheet } from "react-native";

const listaPersonas = [
  { id: 1, nombre: 'Ana', apellidos: 'García López' },
  { id: 2, nombre: 'Luis', apellidos: 'Martínez Pérez' },
  { id: 3, nombre: 'María', apellidos: 'Rodríguez Sánchez' },
  { id: 4, nombre: 'Carlos', apellidos: 'Fernández Gómez' },
  { id: 5, nombre: 'Sofía', apellidos: 'Díaz Morales' },
  { id: 6, nombre: 'Juan', apellidos: 'Hernández Ruiz' },
  { id: 7, nombre: 'Laura', apellidos: 'Jiménez Torres' },
  { id: 8, nombre: 'Miguel', apellidos: 'López Castillo' },
  { id: 9, nombre: 'Elena', apellidos: 'Navarro Ruiz' },
  { id: 10, nombre: 'Pablo', apellidos: 'Romero Sánchez' },
  { id: 11, nombre: 'Isabel', apellidos: 'Morales Vega' },
  { id: 12, nombre: 'Diego', apellidos: 'Ortiz Fernández' },
  { id: 13, nombre: 'Carmen', apellidos: 'Castillo Díaz' },
  { id: 14, nombre: 'Andrés', apellidos: 'Gómez Ramírez' },
  { id: 15, nombre: 'Patricia', apellidos: 'Vázquez Molina' },
]



export default function Index() {
  return (
    <FlatList
      data={listaPersonas}
      keyExtractor={item => item.id.toString()}       //Paréntesis importante
      renderItem={({ item }) => (
        <View style= {styles.item}>
          <Text style= {styles.texto}>{item.nombre}, {item.apellidos}</Text>
        </View>
      )}
    />
      
  );
}




//#region styles
const styles = StyleSheet.create({
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