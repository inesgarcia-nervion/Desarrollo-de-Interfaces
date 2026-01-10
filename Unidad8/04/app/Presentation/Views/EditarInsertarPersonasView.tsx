import  React from "react"; 
import { View, FlatList, TextInput, Button, Text, Image, StyleSheet } from 'react-native';
import { ListadoPersonasVM } from '../Viewmodels/ListadoPersonasVM';

export const ListadoPersonasView = ({ navigation }: any) => {
    const vm = ListadoPersonasVM();

    React.useEffect(() => { 
        const sub = navigation.addListener('focus', vm.loadData); 
        return sub; 
    }, [navigation, vm]);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <TextInput placeholder="Filtrar por nombre..." onChangeText={vm.filtrar} style={styles.input} />
            <FlatList 
                data={vm.personas} 
                keyExtractor={p => p._id.toString()} 
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        {item._foto && <Image source={{ uri: item._foto }} style={styles.img} />}
                        <Text>{item._nombre} {item._apellidos}</Text>
                        <Button title="Editar" onPress={() => navigation.navigate('EditarInsertarPersonas', { persona: item })} />
                        {/* ARREGLADO: vm.deleteP coincide con el ViewModel */}
                        {vm.puedeEliminar && <Button title="Borrar" color="red" onPress={() => vm.deleteP(item._id)} />}
                    </View>
                )} 
            />
            <Button title="Añadir Nueva Persona" onPress={() => navigation.navigate('EditarInsertarPersonas')} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: { borderBottomWidth: 1, marginBottom: 10 },
    item: { padding: 10, borderBottomWidth: 1 },
    img: { width: 50, height: 50, borderRadius: 25 }
});