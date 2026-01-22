"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Platform, View, TextInput, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { runInAction } from 'mobx';
import { EditarInsertarDepartamentosVM } from "../Viewmodels/EditarInsertarDepartamentosVM";
import { AddDepartamentoUseCase } from "../../Domain/Usecases/Departamentos/AddDepartamentoUseCase";
import { UpdateDepartamentoUseCase } from "../../Domain/Usecases/Departamentos/UpdateDepartamentoUseCase";
import { DepartamentoRepository } from "../../Data/Repositories/DepartamentoRepository";
import { useRouter, useLocalSearchParams } from "expo-router";

function EditarInsertarDepartamentosView() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // ← AQUÍ SE OBTIENE EL ID CORRECTAMENTE

  const departamentoRepo = new DepartamentoRepository();
  const [vm] = useState(
    () =>
      new EditarInsertarDepartamentosVM(
        new AddDepartamentoUseCase(departamentoRepo),
        new UpdateDepartamentoUseCase(departamentoRepo)
      )
  );

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const d = await departamentoRepo.GetDepartamentoPorId(Number(id));
        if (d) {
          vm.setDepartamento({ _id: d.id, _nombre: d.nombre });
        }
      } catch (err) {
        console.error("Error cargando departamento:", err);
      }
    })();
  }, [id]);

  const styles: { [k: string]: React.CSSProperties } = {
    card: {
      background: "#ffffff",
      borderRadius: 12,
      padding: 20,
      boxShadow: "0 6px 20px rgba(16,24,40,0.08)",
      maxWidth: 720,
      margin: "0 auto",
    },
    label: {
      display: "block",
      fontSize: 13,
      color: "#374151",
      marginBottom: 6,
      fontWeight: 600,
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 8,
      border: "1px solid #e5e7eb",
      outline: "none",
      boxSizing: "border-box",
    },
    primaryBtn: {
      background: "#059669",
      color: "#fff",
      borderRadius: 8,
      padding: "8px 12px",
      border: "none",
      cursor: "pointer",
    },
    ghostBtn: {
      background: "transparent",
      color: "#374151",
      borderRadius: 8,
      padding: "8px 12px",
      border: "1px solid #e5e7eb",
      cursor: "pointer",
    },
  };

  const isEditing =
    Boolean(vm.departamento && vm.departamento._id && Number(vm.departamento._id) > 0);

  // WEB
  if (Platform.OS === "web") {
    return (
      <div style={{ padding: 18 }}>
        <form
          style={styles.card}
          onSubmit={async (e) => {
            e.preventDefault();
            await vm.guardar();
            router.push("/departamento");
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: "#eef2ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4338ca",
                fontWeight: 700,
              }}
            >
              {(vm.departamento._nombre || "").charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>
                {isEditing ? "Editar Departamento" : "Crear Departamento"}
              </div>
              <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                {isEditing
                  ? vm.departamento._nombre
                  : "Rellena el nombre del departamento"}
              </div>
            </div>
          </div>

          <div>
            <label style={styles.label}>Nombre</label>
            <input
              style={styles.input}
              placeholder="Nombre del Departamento"
              value={vm.departamento._nombre || ""}
              onChange={(e) => (vm.departamento._nombre = e.target.value)}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "flex-end",
              marginTop: 16,
            }}
          >
            <button
              type="button"
              onClick={() => router.push("/departamento")}
              style={styles.ghostBtn}
            >
              Cancelar
            </button>
            <button type="submit" style={styles.primaryBtn}>
              {isEditing ? "Guardar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // NATIVE
  return (
    <ScrollView contentContainerStyle={nativeStyles.container}>
      <View style={nativeStyles.header}>
        <View style={nativeStyles.avatar}>
          <Text style={nativeStyles.avatarText}>
            {(vm.departamento._nombre || "").charAt(0).toUpperCase()}
          </Text>
        </View>
        <View>
          <Text style={nativeStyles.title}>
            {isEditing ? "Editar Departamento" : "Crear Departamento"}
          </Text>
          <Text style={nativeStyles.subtitle}>
            {isEditing
              ? vm.departamento._nombre
              : "Rellena el nombre del departamento"}
          </Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <Text style={nativeStyles.label}>Nombre</Text>
        <TextInput
          style={nativeStyles.input}
          value={vm.departamento._nombre || ""}
          onChangeText={(t) =>
            runInAction(() => {
              vm.departamento._nombre = t;
            })
          }
          placeholder="Nombre del Departamento"
        />

        <View
          style={{
            flexDirection: "row",
            gap: 8,
            justifyContent: "flex-end",
            marginTop: 16,
          }}
        >
          <Pressable
            onPress={() => router.push("/departamento")}
            style={nativeStyles.ghostBtn}
          >
            <Text>Cancelar</Text>
          </Pressable>

          <Pressable
            onPress={async () => {
              await vm.guardar();
              router.push("/departamento");
            }}
            style={nativeStyles.primaryBtn}
          >
            <Text style={{ color: "#fff" }}>
              {isEditing ? "Guardar" : "Crear"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

export default observer(EditarInsertarDepartamentosView);

const nativeStyles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 110,
    paddingBottom: 56,
    backgroundColor: "#f8fafc",
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: { fontWeight: "700", fontSize: 24, color: "#4338ca" },
  title: { fontSize: 20, fontWeight: "700", color: "#111827" },
  subtitle: { fontSize: 13, color: "#6b7280", marginTop: 4 },
  label: { fontSize: 13, color: "#374151", marginBottom: 6 },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  ghostBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "transparent",
    marginRight: 8,
  },
  primaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#059669",
  },
});
