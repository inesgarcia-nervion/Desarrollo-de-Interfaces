import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BotonPersonalizado } from '../components/BotonPersonalizado';
import { Link } from 'expo-router';

export default function Login(){
    return (
        <View style={styles.container}>
            <Text style = {styles.title}>Bienvenido!</Text>
        </View>
    );
}



const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});