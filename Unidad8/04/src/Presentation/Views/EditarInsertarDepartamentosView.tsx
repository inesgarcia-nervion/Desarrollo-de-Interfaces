"use client";
import React, { useEffect } from "react";
import { EditarInsertarDepartamentosVM } from "../Viewmodels/EditarInsertarDepartamentosVM";
import { AddDepartamentoUseCase } from "../../Domain/Usecases/Departamentos/AddDepartamentoUseCase";
import { UpdateDepartamentoUseCase } from "../../Domain/Usecases/Departamentos/UpdateDepartamentoUseCase";
import { DepartamentoRepository } from "../../Data/Repositories/DepartamentoRepository";
import { useRouter } from "expo-router";

export default function EditarInsertarDepartamentosView({ departamentoId }: { departamentoId?: string }) {
  const router = useRouter();
  const departamentoRepo = new DepartamentoRepository();
  const vm = new EditarInsertarDepartamentosVM(new AddDepartamentoUseCase(departamentoRepo), new UpdateDepartamentoUseCase(departamentoRepo));

  useEffect(() => {
    if (departamentoId) {
      (async () => {
        try {
          const id = Number(departamentoId);
          const d = await departamentoRepo.GetDepartamentoPorId(id);
          if (d) {
            vm.setDepartamento({ _id: d.id, _nombre: d.nombre });
          }
        } catch (err) {
          console.error('Error cargando departamento:', err);
        }
      })();
    }
  }, [departamentoId]);

  return (
    <form
      className="p-4"
      onSubmit={async e => {
        e.preventDefault();
        await vm.guardar();
        router.push("/departamento");
      }}
    >
      <input
        placeholder="Nombre del Departamento"
        value={vm.departamento._nombre || ""}
        onChange={e => (vm.departamento._nombre = e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Guardar</button>
    </form>
  );
}
