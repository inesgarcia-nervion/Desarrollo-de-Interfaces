"use client";
import React, { useEffect } from "react";

export default function HomeView() {
  useEffect(() => {
    if (typeof window !== 'undefined') console.log('[view] HomeView rendered, path=', window.location.pathname);
  }, []);
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a la App de Gestión</h1>
      <p className="mb-8">Selecciona una opción del menú o utiliza los botones a continuación:</p>
      <div className="flex justify-center gap-4">
        <a href="/personas" className="bg-blue-500 text-white p-4 rounded">Listado de Personas</a>
        <a href="/departamento" className="bg-green-500 text-white p-4 rounded">Listado de Departamentos</a>
      </div>
    </div>
  );
}
