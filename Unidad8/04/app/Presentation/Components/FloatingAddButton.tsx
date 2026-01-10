import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FloatingAddButtonProps {
    onPress: () => void;
}

export const FloatingAddButton = ({ onPress }: FloatingAddButtonProps) => {
    return (
        <TouchableOpacity style={styles.fab} onPress={onPress}>
            <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: { 
        position: 'absolute', bottom: 30, right: 30, 
        backgroundColor: '#2196F3', width: 65, height: 65, 
        borderRadius: 32.5, justifyContent: 'center', alignItems: 'center', 
        elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4.65 
    },
    fabText: { color: 'white', fontSize: 35, fontWeight: 'bold' }
});