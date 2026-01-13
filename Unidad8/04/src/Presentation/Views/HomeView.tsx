import React from "react";
import Link from "next/link";

export default function HomeView() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenido a la App de Gestión</h1>
      <p className="mb-8">Selecciona una opción del menú o utiliza los botones a continuación:</p>
      <div className="flex justify-center gap-4">
        <Link href="/drawer/personas" className="bg-blue-500 text-white p-4 rounded">Listado de Personas</Link>
        <Link href="/drawer/departamento" className="bg-green-500 text-white p-4 rounded">Listado de Departamentos</Link>
      </div>
    </div>
  );
}
