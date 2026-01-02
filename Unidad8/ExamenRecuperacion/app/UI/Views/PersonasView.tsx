import React from "react";
import { View, Text, Button, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { usePersonasVM } from "../Viewmodels/PersonasVM";

export const PersonasView = () => {
    const { personas, departamentos, seleccionarDepartamento, comprobar, resultado } = usePersonasVM();

    return (
        <View style={{ padding: 20 }}>
        <FlatList
            data={personas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
            <View style={{ backgroundColor: item.colorFila, marginBottom: 10, padding: 10 }}>
                <Text>{item.nombreCompleto}</Text>
                <Picker
                selectedValue={item.departamentoSeleccionadoId}
                onValueChange={(value: number) => seleccionarDepartamento(item.id, value)}
                >
                <Picker.Item label="Selecciona departamento" value={undefined} />
                {departamentos.map(d => (
                    <Picker.Item key={d.id} label={d.nombre} value={d.id} />
                ))}
                </Picker>
            </View>
            )}
        />
        <Button title="Comprobar" onPress={comprobar} />
        {resultado ? <Text style={{ marginTop: 10 }}>{resultado}</Text> : null}
        </View>
    );
};
