import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PokemonView from './UI/Views/PokemonView';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <PokemonView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;