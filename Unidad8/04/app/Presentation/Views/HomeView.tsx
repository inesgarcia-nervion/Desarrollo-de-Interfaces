import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HomeView = () => (
    <View style={styles.c}><Text style={styles.t}>CRUD Azure Personas & Deptos</Text></View>
);
const styles = StyleSheet.create({ 
    c: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    t: { fontSize: 22, fontWeight: 'bold' } 
});