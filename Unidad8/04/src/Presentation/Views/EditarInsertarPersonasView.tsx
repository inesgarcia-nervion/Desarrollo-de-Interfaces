import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";
import { useEditarInsertarPersonasVM } from '../Viewmodels/EditarInsertarPersonasVM';
import { Persona } from '../../Domain/Entities/Persona';

interface Props {
    personaInicial?: Persona;
}

export const EditarInsertarPersonasView = ({ personaInicial }: Props) => {
    const router = useRouter();
    const vm = useEditarInsertarPersonasVM(personaInicial);

    const onSave = async () => { 
        await vm.guardar(); 
        router.replace("personas");
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput value={vm.nombre} onChangeText={vm.setNombre} style={styles.input} />

            <Text style={styles.label}>Apellidos:</Text>
            <TextInput value={vm.apellidos} onChangeText={vm.setApellidos} style={styles.input} />

            <Text style={styles.label}>Edad:</Text>
            <TextInput value={vm.edad} onChangeText={vm.setEdad} keyboardType="numeric" style={styles.input} />

            <Text style={styles.label}>URL Foto:</Text>
            <TextInput value={vm.foto} onChangeText={vm.setFoto} style={styles.input} />
            
            <Text style={styles.label}>Departamento:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={vm.idDepto}
                    onValueChange={(val) => vm.setIdDepto(val)}
                >
                    <Picker.Item label="Seleccione..." value={0} />
                    {vm.departamentos.map(d => (
                        <Picker.Item key={d._id} label={d._nombre} value={d._id} />
                    ))}
                </Picker>
            </View>

            <View style={{ marginVertical: 30 }}>
                <Button title="Guardar" onPress={onSave} color="#2196F3" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: 'white' },
    label: { fontWeight: 'bold', marginTop: 15 },
    input: { borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 5, fontSize: 16 },
    pickerContainer: { borderBottomWidth: 1, borderColor: '#ccc', marginTop: 5 }
});