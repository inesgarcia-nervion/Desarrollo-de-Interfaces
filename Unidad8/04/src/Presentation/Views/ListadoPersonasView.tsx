import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useListadoPersonasVM } from '../Viewmodels/ListadoPersonasVM';
import { ActionHeader } from '../Components/ActionHeader';
import { FloatingAddButton } from '../Components/FloatingAddButton';

export const ListadoPersonasView = () => {
    const vm = useListadoPersonasVM();
    const router = useRouter();

    // Cargar datos cuando la pantalla se monta
    useEffect(() => {
        vm.loadData();
    }, [vm, vm.loadData]);

    // Recargar datos cada vez que la pantalla recibe el foco (volvemos de otra pantalla)
    useFocusEffect(
        React.useCallback(() => {
            vm.loadData();
        }, [vm])
    );

    return (
        <View style={styles.mainContainer}>
            {/* Sección de foto */}
            {vm.personaSeleccionada?._foto && (
                <View style={styles.fotoSection}>
                    <Text style={styles.fotoLabel}>Foto Seleccionada</Text>
                    <Image 
                        source={{ uri: vm.personaSeleccionada._foto }}
                        style={styles.foto}
                    />
                    <Text style={styles.personaNombre}>
                        {vm.personaSeleccionada._nombre} {vm.personaSeleccionada._apellidos}
                    </Text>
                </View>
            )}

            {/* Sección de búsqueda y acciones */}
            <View style={styles.searchSection}>
                <ActionHeader 
                    placeholder="Buscar persona..."
                    onSearch={vm.filtrar}
                    onEdit={() => {
                        if (vm.personaSeleccionada) {
                            router.push({
                                pathname: "/editarPersona",
                                params: { persona: JSON.stringify(vm.personaSeleccionada) }
                            });
                        }
                    }}
                    onDelete={vm.eliminarAction}
                    disabledEdit={!vm.personaSeleccionada}
                    disabledDelete={!vm.personaSeleccionada || !vm.puedeEliminar}
                />
            </View>

            {/* Sección de lista */}
            <View style={styles.listSection}>
                {vm.loading ? (
                    <ActivityIndicator size="large" style={{ marginTop: 20 }} />
                ) : (
                    <FlatList
                        data={vm.personas || []}
                        keyExtractor={(item, index) => item?._id?.toString() ?? index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity 
                                onPress={() => vm.seleccionar(item)}
                                style={[styles.card, vm.personaSeleccionada?._id === item._id && styles.selectedCard]}
                            >
                                <Text style={styles.cardText}>{item._nombre} {item._apellidos}</Text>
                            </TouchableOpacity>
                        )}
                        scrollEnabled={true}
                    />
                )}
            </View>

            <FloatingAddButton onPress={() => router.push("/editarPersona")} />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: { 
        flex: 1, 
        backgroundColor: '#f5f5f5'
    },
    fotoSection: {
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderBottomWidth: 2,
        borderColor: '#e0e0e0',
        elevation: 3
    },
    fotoLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    personaNombre: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
        color: '#333'
    },
    foto: { 
        width: 120, 
        height: 120, 
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#3498db'
    },
    searchSection: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0'
    },
    listSection: {
        flex: 1,
        paddingTop: 10
    },
    card: { 
        backgroundColor: 'white', 
        padding: 15, 
        marginBottom: 8,
        marginHorizontal: 10, 
        borderRadius: 8, 
        elevation: 2,
        borderLeftWidth: 4,
        borderLeftColor: '#ddd'
    },
    selectedCard: { 
        borderLeftColor: '#3498db',
        backgroundColor: '#e3f2fd',
        borderWidth: 1,
        borderColor: '#3498db'
    },
    cardText: { 
        fontSize: 15,
        fontWeight: '500',
        color: '#333'
    }
});
