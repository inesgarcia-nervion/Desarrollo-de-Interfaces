import React from 'react';
import { Platform } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';

export default function Home() {
  if (Platform.OS === 'web') {
    return (
      <div style={{ padding: 16, paddingTop: 110, background: '#f8fafc' }}>
        <h1 className="text-2xl font-bold">Bienvenido a la App de Personas y Departamentos</h1>
        <p>Usa el menú para navegar por los listados.</p>
      </div>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Bienvenido a la App de Personas y Departamentos</Text>
      <Text>Usa el menú para navegar por los listados.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, paddingTop: 110, backgroundColor: '#f8fafc' },
  h1: { fontSize: 20, fontWeight: '700', marginBottom: 6 },
});
