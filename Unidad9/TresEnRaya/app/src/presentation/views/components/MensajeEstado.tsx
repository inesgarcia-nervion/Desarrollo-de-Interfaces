import React from 'react';
import { Text } from 'react-native';

type Props = {
  mensaje: string;
};

const MensajeEstado: React.FC<Props> = ({ mensaje }) => (
  <Text style={{ fontSize: 18, marginVertical: 12, textAlign: 'center' }}>{mensaje}</Text>
);

export default MensajeEstado;
