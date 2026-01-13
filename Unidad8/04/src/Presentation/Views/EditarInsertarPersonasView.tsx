"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { EditarInsertarPersonasVM } from "../Viewmodels/EditarInsertarPersonasVM";
import { AddPersonaUseCase } from "../../Domain/Usecases/Personas/AddPersonaUseCase";
import { UpdatePersonaUseCase } from "../../Domain/Usecases/Personas/UpdatePersonaUseCase";
import { GetDepartamentosUseCase } from "../../Domain/Usecases/Departamentos/GetDepartamentosUseCase";
import { PersonaRepository } from "../../Data/Repositories/PersonaRepository";
import { DepartamentoRepository } from "../../Data/Repositories/DepartamentoRepository";
import { useRouter } from "expo-router";

type Props = {
  personaId?: string | undefined;
};

const repo = new PersonaRepository();
const deptRepo = new DepartamentoRepository();

function EditarInsertarPersonasView({ personaId }: Props) {
  const router = useRouter();
  const [vm] = useState(() => new EditarInsertarPersonasVM(new AddPersonaUseCase(repo), new UpdatePersonaUseCase(repo), new GetDepartamentosUseCase(deptRepo)));

  useEffect(() => {
    // load persona when personaId changes (support querystring or localStorage fallback)
    const resolvedId = personaId ?? (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') ?? undefined : undefined) ?? (typeof window !== 'undefined' ? (() => { try { return localStorage.getItem('editingPersonaId') ?? undefined; } catch { return undefined; } })() : undefined);

    if (!resolvedId) return;

    (async () => {
      try {
        const idNum = Number(resolvedId);
        const pRaw: any = await repo.GetPersonaPorId(idNum);

        // backend may return either the entity directly or { persona: {...}, nombreDepartamento }
        const src = pRaw && pRaw.persona ? pRaw.persona : pRaw;
        const nombreDept = pRaw && pRaw.nombreDepartamento ? pRaw.nombreDepartamento : "";

        const id = src._id ?? src.id ?? 0;
        const nombre = src._nombre ?? src.nombre ?? "";
        const apellidos = src._apellidos ?? src.apellidos ?? src.apellido ?? "";
        const edad = src._edad ?? src.edad ?? src.edadPersona ?? 0;
        const fecha = src._fechaNacimiento ?? src.fechaNacimiento ?? src.fechaNac ?? null;
        const direccion = src._direccion ?? src.direccion ?? "";
        const telefono = src._telefono ?? src.telefono ?? "";
        const foto = src._foto ?? src.foto ?? null;
        const idDept = src._idDepartamento ?? src.idDepartamento ?? src.departamentoId ?? 0;

        vm.setPersona({
          _id: id,
          _nombre: nombre,
          _apellidos: apellidos,
          _edad: edad,
          _fechaNacimiento: fecha ? new Date(fecha).toISOString() : new Date().toISOString(),
          _direccion: direccion,
          _telefono: telefono,
          _foto: foto,
          _idDepartamento: idDept,
          nombreDepartamento: nombreDept
        });

        try { localStorage.removeItem('editingPersonaId'); } catch (e) { /* noop */ }
      } catch (err) {
        console.error('Error cargando persona:', err);
      }
    })();
  }, [personaId]);

  return (
    <form
      className="p-4"
      onSubmit={async e => {
        e.preventDefault();
        await vm.guardar();
        router.push("/");
      }}
    >
      <input placeholder="Nombre" value={vm.persona._nombre || ""} onChange={e => (vm.persona._nombre = e.target.value)} />
      <input placeholder="Apellidos" value={vm.persona._apellidos || ""} onChange={e => (vm.persona._apellidos = e.target.value)} />
      <input type="number" placeholder="Edad" value={vm.persona._edad || 0} onChange={e => (vm.persona._edad = Number(e.target.value))} />
      <select value={vm.persona._idDepartamento || ""} onChange={e => (vm.persona._idDepartamento = Number(e.target.value))}>
        <option value="">Seleccione Departamento</option>
        {vm.departamentos.map(d => (
          <option key={(d as any)._id ?? (d as any).id} value={(d as any)._id ?? (d as any).id}>
            {(d as any)._nombre ?? (d as any).nombre}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-green-500 text-white p-2 mt-2 rounded">Guardar</button>
    </form>
  );
}

export default observer(EditarInsertarPersonasView);
