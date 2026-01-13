"use client";
import React from "react";
import EditarInsertarPersonasView from "@/src/Presentation/Views/EditarInsertarPersonasView";

export default function EditarPersonaPage() {
  // read query string on the client to support client-side navigation
  const id = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') ?? undefined : undefined;
  console.log('[route client] editarPersona id=', id);
  return <EditarInsertarPersonasView personaId={id} />;
}
