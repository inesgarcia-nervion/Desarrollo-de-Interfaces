import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HomeView = () => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Bienvenido</Text>
                <Text style={styles.subtitle}>Gestión de Personas y Departamentos</Text>
                <Text style={styles.hint}>
                    Utiliza el menú lateral (drawer) para navegar entre las diferentes secciones de la aplicación.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        padding: 30,
        alignItems: 'center'
    },
    title: { 
        fontSize: 36, 
        fontWeight: 'bold', 
        color: '#2c3e50',
        marginBottom: 15
    },
    subtitle: {
        fontSize: 18,
        color: '#34495e',
        marginBottom: 30,
        textAlign: 'center'
    },
    hint: {
        fontSize: 14,
        color: '#7f8c8d',
        textAlign: 'center',
        paddingHorizontal: 20 
    }
});