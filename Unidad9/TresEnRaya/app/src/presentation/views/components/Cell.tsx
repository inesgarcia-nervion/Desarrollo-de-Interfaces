import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  value: string | null;
  onPress: () => void;
  disabled?: boolean;
};

const Cell: React.FC<Props> = ({ value, onPress, disabled }) => {
  return (
    <TouchableOpacity style={[styles.cell, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{value ?? ''}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: { width: 80, height: 80, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  disabled: { opacity: 0.6 },
  text: { fontSize: 32 }
});

export default Cell;
