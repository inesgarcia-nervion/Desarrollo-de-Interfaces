import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { ActivityIndicator, View, Text } from 'react-native';
import { container } from '../app/src/core/container';

export default function RootLayout() {
  const [listo, setListo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    container.signalRConnection
      .conectar()
      .then(() => setListo(true))
      .catch((err) => {
        console.error('Error conectando a SignalR:', err);
        setError('No se pudo conectar al servidor. Comprueba tu conexión.');
      });
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

  return <Stack />;
}