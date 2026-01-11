import React, { useEffect, useRef } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useRouter } from "expo-router";
import { useListadoDepartamentosVM } from '../Viewmodels/ListadoDepartamentosVM';
import { ActionHeader } from '../Components/ActionHeader';
import { FloatingAddButton } from '../Components/FloatingAddButton';

export const ListadoDepartamentosView = () => {
    const vm = useListadoDepartamentosVM();
    const router = useRouter();
    const isFirstLoad = useRef(true);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        if (isFirstLoad.current) {
            vm.load();
            isFirstLoad.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await vm.load();
        setRefreshing(false);
    }, [vm]);

    return (
        <View style={styles.container}>
            <ActionHeader 
                placeholder="Buscar departamento..."
                onSearch={vm.filtrar}
                onEdit={() => router.push({
                    pathname: "/editarDepto",
                    params: { depto: JSON.stringify(vm.deptoSeleccionado) }
                })}
                onDelete={vm.eliminarAction}
                disabledEdit={!vm.deptoSeleccionado}
                disabledDelete={!vm.deptoSeleccionado}
            />

            <FlatList
                data={vm.deptos || []}
                keyExtractor={(item, index) => item?._id?.toString() ?? index.toString()}
                renderItem={({ item }) => {
                    const isSelected = vm.deptoSeleccionado?._id === item._id;
                    return (
                        <TouchableOpacity 
                            onPress={() => vm.seleccionar(item)}
                            style={[styles.card, isSelected && styles.cardSelected]}
                        >
                            <Text style={styles.name}>{item._nombre}</Text>
                        </TouchableOpacity>
                    );
                }}
                ListEmptyComponent={
                    vm.loading ? (
                        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
                    ) : (
                        <Text style={styles.emptyText}>No hay departamentos disponibles</Text>
                    )
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />

            <FloatingAddButton onPress={() => router.push("/editarDepto")} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    card: { padding: 20, margin: 5, borderRadius: 8, backgroundColor: 'white' },
    cardSelected: { backgroundColor: '#e8f5e9', borderWidth: 1, borderColor: '#4caf50' },
    name: { fontSize: 16 },
    emptyText: { textAlign: 'center', marginTop: 20, color: '#999', fontSize: 14 }
});