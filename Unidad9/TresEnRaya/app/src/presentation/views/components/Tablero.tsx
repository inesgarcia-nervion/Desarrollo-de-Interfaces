import React from 'react';
import { View } from 'react-native';
import Celda from './Celda';

type Props = {
  tablero: string[][];
  onCeldaPress: (fila: number, columna: number) => void;
};

const Tablero: React.FC<Props> = ({ tablero, onCeldaPress }) => (
  <View>
    {tablero.map((fila, i) => (
      <View key={i} style={{ flexDirection: 'row' }}>
        {fila.map((valor, j) => (
          <Celda key={j} value={valor} onPress={() => onCeldaPress(i, j)} />
        ))}
      </View>
    ))}
  </View>
);

export default Tablero;
