import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function index(){
    return (
      <View>

        <Text style={styles.text}>Estás en Inicio</Text>

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