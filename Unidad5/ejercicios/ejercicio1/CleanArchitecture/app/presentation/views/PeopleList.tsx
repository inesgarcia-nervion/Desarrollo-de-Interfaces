//La vista no sabe nada de los datos ni del repositorio.
//Solo pide el ViewModel al container.
//Muestra los datos que el ViewModel le da.

import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { Persona } from "../../domain/entities/Persona";
import { PeopleListVM } from "../viewmodels/PeopleListVM";



export default function PeopleList() {
  const viewModel = container.get<PeopleListVM>(TYPES.PeopleListVM);
  //Ahora el viewModel tiene la lista de personas cargada desde el repositorio.

  const renderItem = ({ item }: { item: Persona }) => (
    <Text style={styles.itemText}>
        {item.nombre} {item.apellidos}
    </Text>
  );
  //Define cómo se dibuja cada elemento de la lista.
  //React Native usa esta función para pintar cada Persona en el FlatList.



  return (
    //Usamos SafeAreaView para evitar las zonas no seguras en iOS y algunos Android.
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Listado de Personas</Text>

      <FlatList
        data={viewModel.personasList}       //La lista de personas que viene del ViewModel.
        renderItem={renderItem}             //La función que dibuja cada persona. 
        keyExtractor={(item) => item.id.toString()} //Clave única para cada elemento (id).
        ItemSeparatorComponent={() => <View style={styles.separator} />}    //Separador entre elementos.
        ListEmptyComponent={() => (                 
          <Text style={styles.textoVacio}>No hay personas registradas</Text>         
        )}  //Componente que se muestra si la lista está vacía (Para el caso de la clase que está vacía).
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemPresionado: {
    backgroundColor: "#D0E8FF",
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    height: 10,
  },
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textoVacio: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});
