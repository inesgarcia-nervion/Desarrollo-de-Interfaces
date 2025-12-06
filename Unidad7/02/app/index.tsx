import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AuthProvider } from './AuthContext';
import AuthStatus from './components/AuthStatus';

export default function Index() {
  return (
    // Proveemos el contexto a toda la aplicación
    <AuthProvider>
      <View style={styles.container}>
        <AuthStatus />
      </View>
    </AuthProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});