import * as React from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { ListadoPersonasVM } from '../Viewmodels/ListadoPersonasVM';
import { ActionHeader } from '../Components/ActionHeader';
import { FloatingAddButton } from '../Components/FloatingAddButton';

export const ListadoPersonasView = ({ navigation }: any) => {
    const vm = ListadoPersonasVM();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', vm.loadData);
        return unsubscribe;
    }, [navigation, vm.loadData]);

    return (
        <View style={styles.container}>
            <ActionHeader 
                placeholder="Buscar persona..."
                onSearch={vm.filtrar}
                onEdit={() => navigation.navigate('EditarInsertarPersonas', { persona: vm.personaSeleccionada })}
                onDelete={vm.eliminarAction}
                disabledEdit={!vm.personaSeleccionada}
                disabledDelete={!vm.personaSeleccionada || !vm.puedeEliminar}
            />

            <FlatList
                data={vm.personas}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => {
                    const isSelected = vm.personaSeleccionada?._id === item._id;
                    return (
                        <TouchableOpacity 
                            onPress={() => vm.seleccionar(item)}
                            style={[styles.card, isSelected && styles.cardSelected]}
                        >
                            {item._foto && <Image source={{uri: item._foto}} style={styles.avatar} />}
                            <View>
                                <Text style={styles.name}>{item._nombre} {item._apellidos}</Text>
                                <Text style={styles.info}>{item._edad} años</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />

            <FloatingAddButton onPress={() => navigation.navigate('EditarInsertarPersonas')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    card: { flexDirection: 'row', padding: 15, margin: 5, borderRadius: 8, backgroundColor: 'white', alignItems: 'center' },
    cardSelected: { backgroundColor: '#e3f2fd', borderWidth: 1, borderColor: '#2196f3' },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 15 },
    name: { fontWeight: 'bold' },
    info: { color: 'gray' }
});