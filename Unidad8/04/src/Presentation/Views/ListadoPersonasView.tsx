import React, { useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useListadoPersonasVM } from '../Viewmodels/ListadoPersonasVM';
import { useRouter } from 'expo-router';
import { ActionHeader } from '../Components/ActionHeader';
import { FloatingAddButton } from '../Components/FloatingAddButton';

export const ListadoPersonasView = () => {
    const vm = useListadoPersonasVM();
    const router = useRouter();

    // Cargar datos cuando la pantalla se monta
    useEffect(() => {
        vm.loadData();
    }, [vm.loadData]);

    // Recargar datos cada vez que la pantalla recibe el foco (volvemos de otra pantalla)
    useFocusEffect(
        React.useCallback(() => {
            vm.loadData();
        }, [vm.loadData])
    );

    return (
        <View style={{ flex: 1 }}>
            {/* Mostrar foto de persona seleccionada */}
            {vm.personaSeleccionada?._foto && (
                <View style={styles.fotoContainer}>
                    <Image 
                        source={{ uri: vm.personaSeleccionada._foto }}
                        style={styles.foto}
                    />
                </View>
            )}

            {/* Componente superior con Buscar, Editar y Borrar */}
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
                            <Text>{item._nombre} {item._apellidos}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            <FloatingAddButton onPress={() => router.push("/editarPersona")} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    headerButtons: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 15 },
    actionBtn: { backgroundColor: '#f1c40f', padding: 10, borderRadius: 5, marginLeft: 10, minWidth: 70, alignItems: 'center' },
    deleteBtn: { backgroundColor: '#e74c3c' },
    disabledBtn: { backgroundColor: '#bdc3c7' },
    btnText: { fontWeight: 'bold', color: 'white' },
    card: { backgroundColor: 'white', padding: 15, marginBottom: 10, marginHorizontal: 10, borderRadius: 8, elevation: 2 },
    selectedCard: { borderWidth: 2, borderColor: '#3498db', backgroundColor: '#e3f2fd' },
    cardText: { fontSize: 16 },
    fotoContainer: { 
        alignItems: 'center', 
        paddingVertical: 20, 
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderColor: '#e0e0e0'
    },
    foto: { 
        width: 120, 
        height: 120, 
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#3498db'
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#2ecc71',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    fabText: { color: 'white', fontSize: 30, fontWeight: 'bold' }
});