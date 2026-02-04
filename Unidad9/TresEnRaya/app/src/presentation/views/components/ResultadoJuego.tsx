import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  resultado: string;
  simboloGanador?: string;
};

const ResultadoJuego: React.FC<Props> = ({ resultado, simboloGanador }) => (
  <View style={{ alignItems: 'center', marginVertical: 16 }}>
    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{resultado}</Text>
    {simboloGanador && <Text style={{ fontSize: 18 }}>Ganador: {simboloGanador}</Text>}
  </View>
);

export default ResultadoJuego;
