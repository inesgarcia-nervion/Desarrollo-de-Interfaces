import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, Alert } from 'react-native';
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
    const [saving, setSaving] = useState(false);

    const onSave = async () => { 
        try {
            setSaving(true);
            await vm.guardar();
            Alert.alert("Éxito", "Persona guardada correctamente");
            router.push("../personas");
        } catch (error: any) {
            Alert.alert("Error", error.message || "No se pudo guardar la persona");
        } finally {
            setSaving(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Mostrar foto actual */}
            {vm.foto && (
                <View style={styles.fotoContainer}>
                    <Image 
                        source={{ uri: vm.foto }} 
                        style={styles.foto}
                        defaultSource={require('../../../assets/images/icon.png')}
                    />
                </View>
            )}

            <Text style={styles.label}>Nombre:</Text>
            <TextInput value={vm.nombre} onChangeText={vm.setNombre} style={styles.input} />

            <Text style={styles.label}>Apellidos:</Text>
            <TextInput value={vm.apellidos} onChangeText={vm.setApellidos} style={styles.input} />

            <Text style={styles.label}>Edad:</Text>
            <TextInput value={vm.edad} onChangeText={vm.setEdad} keyboardType="numeric" style={styles.input} />

            <Text style={styles.label}>URL Foto:</Text>
            <TextInput value={vm.foto} onChangeText={vm.setFoto} style={styles.input} placeholder="https://..." />
            
            <Text style={styles.label}>Departamento:</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={vm.idDepto}
                    onValueChange={(val) => vm.setIdDepto(Number(val))}
                >
                    <Picker.Item label="Seleccione..." value={0} />
                    {vm.departamentos.map(d => (
                        <Picker.Item key={d._id} label={d._nombre} value={d._id} />
                    ))}
                </Picker>
            </View>

            <View style={{ marginVertical: 30 }}>
                <Button title={saving ? "Guardando..." : "Guardar"} onPress={onSave} color="#2196F3" disabled={saving} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#f5f5f5' },
    label: { fontWeight: 'bold', marginTop: 15, fontSize: 14 },
    input: { borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 8, fontSize: 16, marginTop: 5 },
    pickerContainer: { borderBottomWidth: 1, borderColor: '#ccc', marginTop: 5 },
    fotoContainer: { 
        alignItems: 'center', 
        marginBottom: 25, 
        paddingVertical: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2
    },
    foto: { 
        width: 150, 
        height: 150, 
        borderRadius: 75,
        borderWidth: 3,
        borderColor: '#3498db'
    }
});