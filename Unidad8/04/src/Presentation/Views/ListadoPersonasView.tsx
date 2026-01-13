"use client";
import React, { useEffect } from "react";
import { ListadoPersonasVM } from "../Viewmodels/ListadoPersonasVM";
import { ActionHeader } from "../Components/ActionHeader";
import { FloatingAddButton } from "../Components/FloatingAddButton";
import { GetPersonasUseCase } from "../../Domain/Usecases/Personas/GetPersonasUseCase";
import { DeletePersonaUseCase } from "../../Domain/Usecases/Personas/DeletePersonaUseCase";
import { PersonaRepository } from "../../Data/Repositories/PersonaRepository";
import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";

const repo = new PersonaRepository();
const vm = new ListadoPersonasVM(new GetPersonasUseCase(repo), new DeletePersonaUseCase(repo));

const ListadoPersonasView: React.FC = observer(() => {
  const router = useRouter();

  useEffect(() => {
    console.log('[view] ListadoPersonasView mounted, loading personas');
    vm.cargarPersonas();
  }, []);

  return (
    <div>
      <div id="debug-personas" style={{padding:8,background:'#ccffef',border:'1px solid #2aff9e',marginBottom:8}}>DEBUG: ListadoPersonasView rendered</div>
      <ActionHeader title="Listado de Personas" onAdd={() => router.push("/editarPersona")} />
      <ul>
        {vm.personas.map(p => (
          <li key={p._id} className="flex justify-between p-2 border-b">
            <span>{p._nombre} {p._apellidos} - {p.nombreDepartamento}</span>
            <div>
              <button onClick={() => router.push(`/editarPersona?id=${p._id}`)} className="text-blue-500 mr-2">Editar</button>
              <button onClick={() => vm.eliminarPersona(p._id)} className="text-red-500">Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ListadoPersonasView;
