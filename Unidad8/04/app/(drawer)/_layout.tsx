"use client";
import { useState } from "react";
import { Slot } from "expo-router";

export default function DrawerLayout() {
  const [isOpen, setIsOpen] = useState(false);

  // Debug: show current path and force full navigation on links to avoid SPA routing issues
  const navigateFull = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    // force full page load
    window.location.href = path;
  };

  return (
    <div className="flex">
      <div className={`bg-gray-200 p-4 h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} fixed`}>
        <button onClick={() => setIsOpen(false)}>Cerrar</button>
        <div style={{ fontSize: 12, margin: 8 }}>Ruta actual: {typeof window !== 'undefined' ? window.location.pathname : ''}</div>
        <nav className="flex flex-col gap-2">
          <a href="/" onClick={(e) => navigateFull('/', e)}>Inicio</a>
          <a href="/personas" onClick={(e) => navigateFull('/personas', e)}>Personas</a>
          <a href="/departamento" onClick={(e) => navigateFull('/departamento', e)}>Departamentos</a>
        </nav>
      </div>
      <div className="flex-1 ml-0 md:ml-64">
        <button className="p-2 bg-blue-500 text-white m-2" onClick={() => setIsOpen(true)}>Abrir Menú</button>
        <Slot />
      </div>
    </div>
  );
}
