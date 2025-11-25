import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function Home(){
    return (
    <View style={styles.container}>
        <Stack.Screen options={{ headerShown: true, title: "Inicio" }} />
        
        <Text style={styles.text}>Te has logueado correctamente</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});