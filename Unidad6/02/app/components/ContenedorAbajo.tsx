import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { BotonPersonalizado } from './BotonPersonalizado';


export function ContenedorAbajo() {
  
  // Función para navegar a Home
  const irAHome = () => {
      router.push('/views/Home');
  };

  return (
    <View style={styles.container}>
      
      
      <Text style={styles.titulo}>INGRESAR</Text>
      
      {/* Inputs del formulario */}
      <View style={styles.formGroup}>
        
        <Text style={styles.label}>Correo electrónico</Text>
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder="ejemplo@correo.com" 
                style={styles.input} 
                placeholderTextColor="#999" 
            />
        </View>

        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.inputContainer}>
            <TextInput 
                placeholder="********" 
                secureTextEntry 
                style={styles.input} 
                placeholderTextColor="#999"
            />
        </View>
      </View>
        
      {/* Botón */}
      <View style={{ marginTop: 30, marginBottom: 20 }}>
        <BotonPersonalizado label="ENTRAR" onPress={irAHome} color="orange" />
      </View>
      
      {/* Link a Registro */}
      <View style={styles.footerRegistro}>
          <Text>¿No tienes cuenta? </Text>
          <Link href="/views/Registro" asChild>
              <Pressable>
                  <Text style={styles.linkText}>Regístrate</Text>
              </Pressable>
          </Link>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30,
        width: '100%',
        position: 'absolute', // Importante para que se pegue abajo
        bottom: 0,
    },
    titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333'
    },
    formGroup: {
        marginBottom: 10
    },
    label: {
        fontWeight: 'bold',
        color: 'orange',
        marginTop: 15,
        marginBottom: 5
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 5
    },
    input: {
        fontSize: 16,
        color: '#000',
        height: 30
    },
    footerRegistro: {
        marginTop: 15, 
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    linkText: {
        color: 'orange',
        fontWeight: 'bold',
        marginLeft: 5
    }
});