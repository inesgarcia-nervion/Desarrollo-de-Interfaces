import React, { useEffect, useState } from "react";
import { EditarInsertarPersonasVM } from "../Viewmodels/EditarInsertarPersonasVM";
import { AddPersonaUseCase } from "../../../Domain/Usecases/Personas/AddPersonaUseCase";
import { UpdatePersonaUseCase } from "../../../Domain/Usecases/Personas/UpdatePersonaUseCase";
import { GetDepartamentosUseCase } from "../../../Domain/Usecases/Departamentos/GetDepartamentosUseCase";
import { useRouter } from "next/navigation";

export default function EditarInsertarPersonasView({ personaId }: { personaId?: string }) {
  const router = useRouter();
  const vm = new EditarInsertarPersonasVM(new AddPersonaUseCase(), new UpdatePersonaUseCase(), new GetDepartamentosUseCase());

  useEffect(() => {
    if (personaId) {
      // cargar persona desde repo si existe
    }
  }, [personaId]);

  return (
    <form
      className="p-4"
      onSubmit={async e => {
        e.preventDefault();
        await vm.guardar();
        router.push("/drawer/personas");
      }}
    >
      <input placeholder="Nombre" value={vm.persona._nombre || ""} onChange={e => (vm.persona._nombre = e.target.value)} />
      <input placeholder="Apellidos" value={vm.persona._apellidos || ""} onChange={e => (vm.persona._apellidos = e.target.value)} />
      <input type="number" placeholder="Edad" value={vm.persona._edad || 0} onChange={e => (vm.persona._edad = Number(e.target.value))} />
      <select value={vm.persona._idDepartamento || ""} onChange={e => (vm.persona._idDepartamento = Number(e.target.value))}>
        <option value="">Seleccione Departamento</option>
        {vm.departamentos.map(d => <option key={d._id} value={d._id}>{d._nombre}</option>)}
      </select>
      <button type="submit" className="bg-green-500 text-white p-2 mt-2 rounded">Guardar</button>
    </form>
  );
}
