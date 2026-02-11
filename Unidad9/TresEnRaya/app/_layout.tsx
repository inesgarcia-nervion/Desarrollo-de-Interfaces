import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { ActivityIndicator, View, Text } from 'react-native';
import { container } from '../app/src/core/container';
import './global.css';

export default function RootLayout() {
  const [listo, setListo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    container.signalRConnection
      .conectar()
      .then(() => setListo(true))
      .catch(() => {
        setError('No se pudo conectar al servidor. Comprueba tu conexión.');
      });

    if (typeof document !== 'undefined') {
      const headers = document.querySelectorAll('header, nav, [role="banner"]');
      headers.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });

      document.body.style.margin = '0';
      document.body.style.padding = '0';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    }
  }, []);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>{error}</Text>
      </View>
    );
  }

  if (!listo) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Conectando al servidor...</Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}