import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Props = {
  value: string;
  onPress: () => void;
};

const Celda: React.FC<Props> = ({ value, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ width: 60, height: 60, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 32 }}>{value}</Text>
  </TouchableOpacity>
);

export default Celda;
