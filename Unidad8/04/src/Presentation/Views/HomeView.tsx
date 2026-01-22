"use client";
import React, { useEffect } from "react";
import { Platform } from 'react-native';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function HomeView() {
  useEffect(() => {
    if (typeof window !== 'undefined') console.log('[view] HomeView rendered, path=', window.location.pathname);
  }, []);

  if (Platform.OS === 'web') {
    return (
      <div style={{ padding: 18, paddingTop: 110, textAlign: 'center', background: '#f8fafc' }}>
        <h1 className="text-3xl font-bold mb-4">Bienvenido a la App de Gestión</h1>
        <p className="mb-8">Selecciona una opción del menú o utiliza los botones a continuación:</p>
        <div className="flex justify-center gap-4">
          <a href="/personas" className="bg-blue-500 text-white p-4 rounded">Listado de Personas</a>
          <a href="/departamento" className="bg-green-500 text-white p-4 rounded">Listado de Departamentos</a>
        </div>
      </div>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Bienvenido a la App de Gestión</Text>
      <Text style={styles.p}>Selecciona una opción del menú o utiliza los botones a continuación:</Text>
      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Listado de Personas</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.buttonGreen]} onPress={() => {}}>
          <Text style={styles.buttonText}>Listado de Departamentos</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 110, alignItems: 'center', backgroundColor: '#f8fafc' },
  h1: { fontSize: 24, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  p: { marginBottom: 12, textAlign: 'center' },
  row: { flexDirection: 'row', gap: 12 },
  button: { backgroundColor: '#2563eb', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 6, marginHorizontal: 6 },
  buttonGreen: { backgroundColor: '#10b981' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
