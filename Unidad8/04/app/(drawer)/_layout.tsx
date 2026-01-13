"use client";
import Link from "next/link";
import { useState } from "react";

export default function DrawerLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex">
      <div className={`bg-gray-200 p-4 h-screen transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} fixed`}>
        <button onClick={() => setIsOpen(false)}>Cerrar</button>
        <nav className="flex flex-col gap-2">
          <Link href="/drawer/index">Inicio</Link>
          <Link href="/drawer/personas">Personas</Link>
          <Link href="/drawer/departamento">Departamentos</Link>
        </nav>
      </div>
      <div className="flex-1 ml-0 md:ml-64">
        <button className="p-2 bg-blue-500 text-white m-2" onClick={() => setIsOpen(true)}>Abrir Menú</button>
        {children}
      </div>
    </div>
  );
}
