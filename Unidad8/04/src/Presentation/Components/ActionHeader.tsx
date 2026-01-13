import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ActionHeaderProps {
    // search variant
    placeholder?: string;
    onSearch?: (text: string) => void;
    onEdit?: () => void;
    onDelete?: () => void;
    disabledEdit?: boolean;
    disabledDelete?: boolean;
    // simple title + add variant
    title?: string;
    onAdd?: () => void;
}

export const ActionHeader = ({
    placeholder,
    onSearch,
    onEdit,
    onDelete,
    disabledEdit,
    disabledDelete,
    title,
    onAdd,
}: ActionHeaderProps) => {
    // If a title prop is provided, render the simple header used in some views
    if (title) {
        return (
            <View style={[styles.header, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>{title}</Text>
                {/* Top 'Añadir' button removed by request; use floating add button instead */}
                <View />
            </View>
        );
    }

    return (
        <View style={styles.header}>
            <TextInput
                placeholder={placeholder}
                style={styles.searchBar}
                onChangeText={onSearch}
                placeholderTextColor="#999"
            />
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    disabled={!!disabledEdit}
                    style={[styles.btn, styles.btnEdit, disabledEdit && styles.btnDisabled]}
                    onPress={onEdit}
                >
                    <Text style={[styles.btnText, disabledEdit && styles.btnTextDisabled]}>✏️ Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={!!disabledDelete}
                    style={[styles.btn, styles.btnDelete, disabledDelete && styles.btnDisabled]}
                    onPress={onDelete}
                >
                    <Text style={[styles.btnText, disabledDelete && styles.btnTextDisabled]}>🗑️ Borrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: { padding: 15, backgroundColor: 'white', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2, position: 'relative', zIndex: 100 },
    searchBar: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 5, fontSize: 16 },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
    btn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, width: '48%', alignItems: 'center' },
    btnEdit: { backgroundColor: '#2196F3' },
    btnDelete: { backgroundColor: '#F44336' },
    btnDisabled: { backgroundColor: '#E0E0E0' },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
    btnTextDisabled: { color: '#777', fontWeight: 'bold', fontSize: 14 }
});