import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function search(){
    return (
      <View>

        <Text style={styles.text}>Estás en Búsqueda</Text>

      </View>
  );
}



const styles = StyleSheet.create({
  text: {
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10
  }
});