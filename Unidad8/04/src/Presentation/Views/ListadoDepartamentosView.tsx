import React, { useEffect } from "react";
import { ListadoDepartamentosVM } from "../Viewmodels/ListadoDepartamentosVM";
import { ActionHeader } from "../Components/ActionHeader";
import { GetDepartamentosUseCase } from "../../../Domain/Usecases/Departamentos/GetDepartamentosUseCase";
import { DeleteDepartamentoUseCase } from "../../../Domain/Usecases/Departamentos/DeleteDepartamentoUseCase";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

const vm = new ListadoDepartamentosVM(new GetDepartamentosUseCase(), new DeleteDepartamentoUseCase());

const ListadoDepartamentosView: React.FC = observer(() => {
  const router = useRouter();

  useEffect(() => {
    vm.cargarDepartamentos();
  }, []);

  return (
    <div>
      <ActionHeader title="Listado de Departamentos" onAdd={() => router.push("/drawer/editarDepto")} />
      <ul>
        {vm.departamentos.map(d => (
          <li key={d._id} className="flex justify-between p-2 border-b">
            <span>{d._nombre}</span>
            <div>
              <button onClick={() => router.push(`/drawer/editarDepto?id=${d._id}`)} className="text-blue-500 mr-2">Editar</button>
              <button onClick={() => vm.eliminarDepartamento(d._id)} className="text-red-500">Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ListadoDepartamentosView;
