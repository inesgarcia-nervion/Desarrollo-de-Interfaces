import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ListRenderItem
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { Container } from '@/app/Core/Container';
import { PokemonViewModel } from '../ViewModels/PokemonViewModel';
import { Pokemon } from '../../Domain/Entities/Pokemon';
import { IPokemonUseCase } from '../../Domain/Interfaces/Usecases/IPokemonUseCase';

// Inicializar DI Container
const container = new Container();
container.RegisterServices();
const useCase = container.Resolve<IPokemonUseCase>('IPokemonUseCase');
const viewModel = new PokemonViewModel(useCase);

const PokemonView: React.FC = observer(() => {
  const [vm] = useState<PokemonViewModel>(viewModel);

  const renderPokemonItem: ListRenderItem<Pokemon> = ({ item }) => (
    <View style={styles.pokemonItem}>
      <Text style={styles.pokemonId}>#{item._id}</Text>
      <Text style={styles.pokemonName}>{item._name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pokémon</Text>

      <FlatList
        data={vm.PokemonList}
        renderItem={renderPokemonItem}
        keyExtractor={(item) => item._id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      {vm.ErrorMessage ? (
        <Text style={styles.errorMessage}>{vm.ErrorMessage}</Text>
      ) : null}

      {vm.IsLoading ? (
        <ActivityIndicator size="large" color="#0066cc" style={styles.loader} />
      ) : null}

      <TouchableOpacity
        style={[styles.button, vm.IsLoading && styles.buttonDisabled]}
        onPress={() => vm.LoadNextPage()}
        disabled={vm.IsLoading}
      >
        <Text style={styles.buttonText}>
          {vm.IsLoading ? 'Cargando...' : 'Cargar Siguiente Página'}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 10,
  },
  pokemonItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pokemonId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
    marginRight: 10,
    width: 40,
  },
  pokemonName: {
    fontSize: 18,
    color: '#333',
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 14,
  },
  loader: {
    marginVertical: 10,
  },
});

export default PokemonView;