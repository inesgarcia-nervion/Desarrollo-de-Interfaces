import React, { useEffect, useRef } from "react";
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { observer } from "mobx-react-lite";
import { container } from "../../Core/container";
import { TYPES } from "../../Core/types";
import { PersonaListVM } from "../ViewModels/PersonaListVM";
import { Persona } from "../../Domain/Entities/Persona";

// Obtenemos el ViewModel inyectado desde el contenedor (Inversify)
const personasViewModel = container.get<PersonaListVM>(TYPES.PersonaListVM)


const PeopleList = observer(() => {

  // Al cargar el componente, ejecutamos la lógica para obtener los datos 
  useEffect(() => {
    personasViewModel.fetchPersonas();
  }, []);


  // --- Lógica de Renderizado ---

  if (personasViewModel.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando personas...</Text>
      </View>
    );
  }



  if (personasViewModel.error){
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {personasViewModel.error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Persona }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.nombre} {item.apellidos}</Text>
      <Text>ID: {item.id} | Edad: {item.edad}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Personas de Azure API</Text>
      <FlatList
        data={personasViewModel.personasList}
        keyExtractor={(item, index) => {
          // Esto nos dirá en la consola qué campos tiene realmente tu objeto
          console.log("Datos de la persona:", item); 
          
          // Si item.id no existe, usará el índice de la lista para que no de error
          return item?.id?.toString() ?? index.toString();
        }}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.centerText}>No se encuentra la lista</Text>}
      />
    </View>
  );
});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f0f0f0'
  },
  
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  centerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16
  },

  item: {
    padding: 20, 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f0f0f0'
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  errorText: {
    color: 'red',
    fontSize: 18
  }
  
});

export default PeopleList;