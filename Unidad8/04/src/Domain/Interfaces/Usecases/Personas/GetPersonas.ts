import React, { useEffect } from "react";
import { EditarInsertarDepartamentosVM } from "../../../../Presentation/Viewmodels/EditarInsertarDepartamentosVM";
import { AddDepartamentoUseCase } from "../../../Usecases/Departamentos/AddDepartamentoUseCase";
import { UpdateDepartamentoUseCase } from "../../../Usecases/Departamentos/UpdateDepartamentoUseCase";
import { useRouter } from "next/navigation";

export default function EditarInsertarDepartamentosView({ departamentoId }: { departamentoId?: string }) {
  const router = useRouter();
  const vm = new EditarInsertarDepartamentosVM(new AddDepartamentoUseCase(), new UpdateDepartamentoUseCase());

  useEffect(() => {
    if (departamentoId) {
      // Cargar departamento desde repo si existe
    }
  }, [departamentoId]);

  return (
    <form
      className="p-4"
      onSubmit={async e => {
        e.preventDefault();
        await vm.guardar();
        // cast to any to satisfy different router type signatures in this mixed codebase
        router.push("/drawer/departamento" as any);
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
