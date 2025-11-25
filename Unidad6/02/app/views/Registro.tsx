import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { BotonPersonalizado } from '../components/BotonPersonalizado';
import { Link } from 'expo-router';

export default function Registro(){
    return (
      <View>

        <Text style={styles.text}>Página de registro</Text>

        {/* Link a Login */}
        <Link href="/views/Login" asChild>
          <BotonPersonalizado label="Ir a Login" />
        </Link>    
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