"use client";
import React, { useEffect } from "react";
import { ListadoDepartamentosVM } from "../Viewmodels/ListadoDepartamentosVM";
import { ActionHeader } from "../Components/ActionHeader";
import { GetDepartamentosUseCase } from "../../Domain/Usecases/Departamentos/GetDepartamentosUseCase";
import { DeleteDepartamentoUseCase } from "../../Domain/Usecases/Departamentos/DeleteDepartamentoUseCase";
import { DepartamentoRepository } from "../../Data/Repositories/DepartamentoRepository";
import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";

const departamentoRepo = new DepartamentoRepository();
const vm = new ListadoDepartamentosVM(new GetDepartamentosUseCase(departamentoRepo), new DeleteDepartamentoUseCase(departamentoRepo));

const ListadoDepartamentosView: React.FC = observer(() => {
  const router = useRouter();

  useEffect(() => {
    console.log('[view] ListadoDepartamentosView mounted, loading departamentos');
    vm.cargarDepartamentos();
  }, []);

  return (
    <div>
      <div id="debug-departamentos" style={{padding:8,background:'#fffbcc',border:'1px solid #ffd42a',marginBottom:8}}>DEBUG: ListadoDepartamentosView rendered</div>
      <ActionHeader title="Listado de Departamentos" onAdd={() => router.push("/editarDepto" as any)} />
      <ul>
        {vm.departamentos.map(d => (
          <li key={d._id} className="flex justify-between p-2 border-b">
            <span>{d._nombre}</span>
            <div>
              <button onClick={() => router.push(`/editarDepto?id=${(d as any)._id ?? (d as any).id}` as any)} className="text-blue-500 mr-2">Editar</button>
              <button onClick={() => vm.eliminarDepartamento(d._id)} className="text-red-500">Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ListadoDepartamentosView;
