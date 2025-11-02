import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { container } from "../../core/container";
import { TYPES } from "../../core/types";
import { PeopleListVM } from "../viewmodels/PeopleListVM";

export default function PeopleList() {
    const viewModel = container.get<PeopleListVM>(TYPES.PeopleListVM);
    const persona = viewModel.personaDelDia;

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Persona del Día</Text>
            <Text style={styles.text}>{persona.nombre} {persona.apellidos}</Text>
            <Text style={styles.text}>Fecha de nacimiento: {persona.fechaNacimiento.toDateString()}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    text: { fontSize: 18 }
});