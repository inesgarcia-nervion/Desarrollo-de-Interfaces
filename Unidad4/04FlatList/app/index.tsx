import { Text, View, FlatList, StyleSheet } from "react-native";

const listaPersonas = [
  { id: '001', nombre: 'Ana', apellidos: 'García López' },
  { id: '002', nombre: 'Luis', apellidos: 'Martínez Pérez' },
  { id: '003', nombre: 'María', apellidos: 'Rodríguez Sánchez' },
  { id: '004', nombre: 'Carlos', apellidos: 'Fernández Gómez' },
  { id: '005', nombre: 'Sofía', apellidos: 'Díaz Morales' },
  { id: '006', nombre: 'Juan', apellidos: 'Hernández Ruiz' },
  { id: '007', nombre: 'Laura', apellidos: 'Jiménez Torres' },
  { id: '008', nombre: 'Miguel', apellidos: 'López Castillo' },
  { id: '009', nombre: 'Elena', apellidos: 'Navarro Ruiz' },
  { id: '010', nombre: 'Pablo', apellidos: 'Romero Sánchez' },
  { id: '011', nombre: 'Isabel', apellidos: 'Morales Vega' },
  { id: '012', nombre: 'Diego', apellidos: 'Ortiz Fernández' },
  { id: '013', nombre: 'Carmen', apellidos: 'Castillo Díaz' },
  { id: '014', nombre: 'Andrés', apellidos: 'Gómez Ramírez' },
  { id: '015', nombre: 'Patricia', apellidos: 'Vázquez Molina' },
]



export default function Index() {
  return (
    <FlatList
      data={listaPersonas}
      keyExtractor={item => item.id}
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