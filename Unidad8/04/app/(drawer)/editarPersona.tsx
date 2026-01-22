"use client";
import React from "react";
import EditarInsertarPersonasView from "@/src/Presentation/Views/EditarInsertarPersonasView";
import { useLocalSearchParams } from 'expo-router';

export default function EditarPersonaPage() {
  const params = useLocalSearchParams();
  const id = (params as any).id as string | undefined;
  console.log('[route client] editarPersona id=', id);
  return <EditarInsertarPersonasView personaId={id} />;
}
