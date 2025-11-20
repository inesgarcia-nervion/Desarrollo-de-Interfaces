import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { BotonPersonalizado } from '../components/BotonPersonalizado';
import { Link } from 'expo-router';

export default function Registro(){
    return (
      <View style = {{
        justifyContent: "center",
        alignItems: "center",
      }}>
        <View style={styles.container}>
            <Text style = {styles.title}>INGRESAR</Text>
            <TextInput
              placeholder='Usuario'
              style={styles.text}
            />
            <TextInput
              placeholder='Contraseña'
              style={styles.text}
            />
            <Link href="/views/Login" asChild>
                <BotonPersonalizado label="Ir a Login" />
            </Link>
        </View>
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
  text: {
      fontWeight: 'bold',
      borderWidth: 2,
      borderColor: "bold",
      marginTop: 10,
      marginBottom: 10
  }
});