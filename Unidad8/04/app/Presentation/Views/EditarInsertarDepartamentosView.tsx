import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useEditarInsertarDepartamentosVM } from '../Viewmodels/EditarInsertarDepartamentosVM';

export const EditarInsertarDepartamentosView = ({ route, navigation }: any) => {
    const vm = useEditarInsertarDepartamentosVM(route.params?.depto);

    const onSave = async () => { await vm.guardar(); navigation.goBack(); };

    return (
        <View style={{ padding: 20 }}>
            <Text>Nombre del Departamento:</Text>
            <TextInput value={vm.nombre} onChangeText={vm.setNombre} style={{ borderBottomWidth: 1, marginBottom: 20 }} />
            <Button title="Guardar" onPress={onSave} />
        </View>
    );
};