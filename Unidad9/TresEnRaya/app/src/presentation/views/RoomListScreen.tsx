import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { RoomListViewModel } from '../viewmodels/RoomListViewModel';

type Props = {
  viewModel: RoomListViewModel;
  onCrearSala: () => void;
  onUnirseASala: (idSala: string) => void;
};

const RoomListScreen: React.FC<Props> = observer(({ viewModel, onCrearSala, onUnirseASala }) => {
  const [nombreSala, setNombreSala] = useState('');

  useEffect(() => {
    viewModel.iniciarEscucha();
  }, []);

  const handleCrearSala = () => {
    const nombre = nombreSala.trim() || 'Sala rápida';
    viewModel.crearSala(nombre);
    setNombreSala('');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Tres en Raya</Text>
          <Text style={styles.subtitulo}>Multijugador en tiempo real</Text>
          <View style={styles.estadoBadge}>
            <Text style={styles.estadoTexto}>Conectado</Text>
          </View>
        </View>

        {/* Card para crear sala */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Nueva Sala</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Nombre de la sala..."
              placeholderTextColor="#8e8e93"
              value={nombreSala}
              onChangeText={setNombreSala}
              maxLength={30}
            />
            <TouchableOpacity
              style={[styles.btnCrear, !nombreSala.trim() && styles.btnDisabled]}
              onPress={handleCrearSala}
              disabled={!nombreSala.trim()}
              activeOpacity={0.8}
            >
              <Text style={styles.btnTexto}>Crear</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card de salas disponibles */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Salas Disponibles</Text>
          
          {viewModel.error && (
            <Text style={styles.errorText}>{viewModel.error}</Text>
          )}
          
          {viewModel.estaCargando ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
            </View>
          ) : viewModel.salas.length === 0 ? (
            <Text style={styles.sinSalas}>
              No hay salas disponibles. ¡Crea una!
            </Text>
          ) : (
            <View style={styles.listaSalasContainer}>
              {viewModel.salas.map((item) => (
                <View 
                  key={item.id} 
                  style={[styles.salaItem, item.estaLlena && styles.salaLlena]}
                >
                  <View style={styles.salaInfo}>
                    <Text style={styles.salaNombre}>{item.nombre}</Text>
                    <Text style={styles.salaJugadores}>
                      {item.jugadoresActuales}/{item.jugadoresMaximos}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.btnUnirse, item.estaLlena && styles.btnUnirseDisabled]}
                    onPress={() => onUnirseASala(item.id)}
                    disabled={item.estaLlena}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.btnUnirseTexto, item.estaLlena && styles.btnUnirseTextoDisabled]}>
                      {item.estaLlena ? 'Llena' : 'Unirse'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 24,
    fontWeight: '400',
  },
  estadoBadge: {
    backgroundColor: 'rgba(50, 215, 75, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  estadoTexto: {
    color: '#32D74B',
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Cards
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#3a3a3c',
  },
  cardTitulo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  
  // Input y botón crear
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#2c2c2e',
    borderWidth: 1,
    borderColor: '#3a3a3c',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 16,
  },
  btnCrear: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Lista de salas
  loadingContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  listaSalasContainer: {
    gap: 10,
    maxHeight: 320,
  },
  salaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2c2c2e',
    borderWidth: 1,
    borderColor: '#3a3a3c',
    borderRadius: 10,
    padding: 16,
  },
  salaLlena: {
    opacity: 0.5,
  },
  salaInfo: {
    flex: 1,
  },
  salaNombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  salaJugadores: {
    fontSize: 14,
    color: '#8e8e93',
  },
  btnUnirse: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btnUnirseDisabled: {
    borderColor: '#8e8e93',
  },
  btnUnirseTexto: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  btnUnirseTextoDisabled: {
    color: '#8e8e93',
  },
  sinSalas: {
    textAlign: 'center',
    color: '#8e8e93',
    fontSize: 15,
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#FF453A',
    fontSize: 14,
    marginBottom: 12,
  },
});

export default RoomListScreen;
