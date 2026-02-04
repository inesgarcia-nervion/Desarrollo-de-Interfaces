import React, { useEffect } from 'react';
import { View, FlatList, Button, ActivityIndicator } from 'react-native';
import ElementoListaSala from './components/ElementoListaSala';
import { RoomListViewModel } from '../viewmodels/RoomListViewModel';

type Props = {
  viewModel: RoomListViewModel;
  onCrearSala: () => void;
  onUnirseASala: (idSala: string) => void;
};

const RoomListScreen: React.FC<Props> = ({ viewModel, onCrearSala, onUnirseASala }) => {
  useEffect(() => {
    viewModel.cargarSalas();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Crear Sala" onPress={onCrearSala} />
      {viewModel.estaCargando ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={viewModel.salas}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ElementoListaSala sala={item} onUnirse={onUnirseASala} />
          )}
          style={{ marginTop: 16 }}
        />
      )}
    </View>
  );
};

export default RoomListScreen;
