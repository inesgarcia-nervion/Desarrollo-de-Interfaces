import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ActionHeaderProps {
    placeholder: string;
    onSearch: (text: string) => void;
    onEdit: () => void;
    onDelete: () => void;
    disabledEdit: boolean;
    disabledDelete: boolean;
}

export const ActionHeader = ({ 
    placeholder, onSearch, onEdit, onDelete, disabledEdit, disabledDelete 
}: ActionHeaderProps) => {
    return (
        <View style={styles.header}>
            <TextInput 
                placeholder={placeholder} 
                style={styles.searchBar} 
                onChangeText={onSearch}
            />
            <View style={styles.buttonRow}>
                <TouchableOpacity 
                    disabled={disabledEdit}
                    style={[styles.btn, styles.btnEdit, disabledEdit && styles.btnDisabled]}
                    onPress={onEdit}
                >
                    <Text style={styles.btnText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    disabled={disabledDelete}
                    style={[styles.btn, styles.btnDelete, disabledDelete && styles.btnDisabled]}
                    onPress={onDelete}
                >
                    <Text style={styles.btnText}>Borrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: { padding: 15, backgroundColor: 'white', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 },
    searchBar: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 5, fontSize: 16 },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
    btn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, width: '48%', alignItems: 'center' },
    btnEdit: { backgroundColor: '#2196F3' },
    btnDelete: { backgroundColor: '#F44336' },
    btnDisabled: { backgroundColor: '#E0E0E0' },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 14 }
});