import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameResult: React.FC<{ result: string | null }> = ({ result }) => {
  if (!result) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{result}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  text: { fontSize: 20, fontWeight: 'bold' }
});

export default GameResult;
