import React from "react";
import { View, Text, Button, FlatList, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { usePersonasVM } from "../Viewmodels/PersonasVM";
import { ResultadoView } from "./ResultadoView";

export const PersonasView = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState("");
    const { personas, departamentos, seleccionarDepartamento, comprobar, resultado } = usePersonasVM();

    React.useEffect(() => {
        if (resultado === "¡Enhorabuena, has acertado todos los departamentos!") {
            setModalMessage(resultado);
            setShowModal(true);
        }
    }, [resultado]);

    return (
        <View style={{ flex: 1, padding: 20 }}>
        <FlatList
            data={personas}
            keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
            renderItem={({ item }) => (
            <View style={{ backgroundColor: item.colorFila, marginBottom: 10, padding: 10 }}>
                <Text>{item.nombreCompleto}</Text>
                <Picker
                selectedValue={item.departamentoSeleccionadoId ? parseInt(item.departamentoSeleccionadoId) : undefined}
                onValueChange={(value: number) => seleccionarDepartamento(item.id, value.toString())}
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
        <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
            <ResultadoView mensaje={modalMessage} />
            <Button title="Cerrar" onPress={() => setShowModal(false)} />
        </Modal>
        </View>
    );
};
