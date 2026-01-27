import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  text: { fontSize: 18 }
});

export default StatusMessage;
