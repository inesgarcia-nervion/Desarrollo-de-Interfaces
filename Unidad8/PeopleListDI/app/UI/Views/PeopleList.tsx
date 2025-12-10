import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { container } from "../../Core/container";
import { TYPES } from "../../Core/types";
import { Persona } from "../../Domain/Entities/Persona";
import { PeopleListVM } from "../ViewModels/PeopleListVM";

// Paleta de Colores Moderna y Suave
const COLORS = {
  background: "#F0F3F7", // Fondo muy claro y frío
  card: "#FFFFFF",
  primary: "#6366F1", // Azul/Violeta (Indigo) más suave
  primaryLight: "#C7D2FE", // Tono claro del primary
  text: "#111827", // Gris oscuro para texto principal
  subtle: "#9CA3AF", // Gris claro para texto secundario
  highlight: "#ECF4FF", // Fondo para el item seleccionado
};

// Función para obtener las iniciales
const getInitials = (nombre: string, apellidos: string) => {
  const firstInitial = nombre.charAt(0) || "";
  const lastInitial = apellidos.charAt(0) || "";
  return `${firstInitial}${lastInitial}`.toUpperCase();
};

const PeopleList = observer(() => {
  const vmRef = useRef<PeopleListVM | null>(null);

  if (vmRef.current === null) {
    vmRef.current = container.get<PeopleListVM>(TYPES.PeopleListVM);
  }

  const viewModel = vmRef.current;

  // --- Renderizado de un ítem de la lista (más visual) ---
  const renderItem = ({ item }: { item: Persona }) => {
    const isSelected = viewModel.personaSeleccionada?.id === item.id;

    return (
      <Pressable
        style={({ pressed }) => [
          styles.listItem,
          isSelected && styles.listItemSelected, // Estilo para el seleccionado
          pressed && { opacity: 0.75 }, // Efecto de presión
        ]}
        onPress={() => {
          viewModel.personaSeleccionada = item;
        }}
      >
        {/* Avatar/Iniciales */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {getInitials(item.nombre, item.apellidos)}
          </Text>
        </View>

        {/* Información */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoName}>
            {item.nombre} {item.apellidos}
          </Text>
          <Text style={styles.infoRole}>
            {`ID: ${item.id}`} {/* Suponiendo que el ID es un 'rol' o dato secundario */}
          </Text>
        </View>

        {/* Indicador de Selección (si es necesario) */}
        {isSelected && (
          <View style={styles.selectedIndicator}>
            <Text style={{ color: COLORS.primary, fontWeight: '800' }}>✓</Text>
          </View>
        )}
      </Pressable>
    );
  };

  const selectedPersonText = viewModel.personaSeleccionada
    ? `${viewModel.personaSeleccionada.nombre} ${viewModel.personaSeleccionada.apellidos}`
    : "Ninguna persona seleccionada";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Directorio de Personal</Text>
      </View>

      <View style={styles.contentWrapper}>
        {/* Caja de Selección (ahora un indicador superior) */}
        <View style={styles.selectedBox}>
          <Text style={styles.selectedTitle}>Persona Seleccionada</Text>
          <Text style={styles.selectedPerson}>{selectedPersonText}</Text>
        </View>

        {/* Contenedor de la Lista (simulando una tarjeta grande) */}
        <View style={styles.listCard}>
          <FlatList
            data={viewModel.personasList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            // Utilizamos el margen interno de la tarjeta para separación, no un separador.
            ListEmptyComponent={() => (
              <Text style={styles.noData}>No hay personas registradas</Text>
            )}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, // El fondo domina
  },
  
  header: {
    paddingHorizontal: 25,
    paddingTop: 10,
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
  },
  
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // --- Caja de Selección ---
  selectedBox: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  selectedTitle: {
    fontSize: 12,
    color: COLORS.subtle,
    marginBottom: 2,
    textTransform: "uppercase",
    fontWeight: "600",
  },

  selectedPerson: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primary,
  },

  // --- Estilos de la Lista/Tarjeta Contenedora ---
  listCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    overflow: 'hidden', // Asegura que los items no se salgan del radio
    
    // Sombra más grande para que parezca un contenedor principal
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 6,
  },

  flatListContent: {
    paddingVertical: 10,
  },

  // --- Estilos de los Ítems (Rows) ---
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.subtle + '10', // Borde inferior muy sutil
    backgroundColor: COLORS.card,
  },

  listItemSelected: {
    backgroundColor: COLORS.highlight, // Color claro para el seleccionado
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  avatarText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 16,
  },

  infoContainer: {
    flex: 1,
  },

  infoName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },

  infoRole: {
    fontSize: 13,
    color: COLORS.subtle,
    marginTop: 2,
  },
  
  selectedIndicator: {
    paddingLeft: 10,
  },

  noData: {
    paddingVertical: 40,
    textAlign: "center",
    color: COLORS.subtle,
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default PeopleList;