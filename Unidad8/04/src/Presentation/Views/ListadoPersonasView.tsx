import React, { useEffect } from "react";
import { ListadoPersonasVM } from "../Viewmodels/ListadoPersonasVM";
import { ActionHeader } from "../Components/ActionHeader";
import { FloatingAddButton } from "../Components/FloatingAddButton";
import { GetPersonasUseCase } from "../../../Domain/Usecases/Personas/GetPersonasUseCase";
import { DeletePersonaUseCase } from "../../../Domain/Usecases/Personas/DeletePersonaUseCase";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";

const vm = new ListadoPersonasVM(new GetPersonasUseCase(), new DeletePersonaUseCase());

const ListadoPersonasView: React.FC = observer(() => {
  const router = useRouter();

  useEffect(() => {
    vm.cargarPersonas();
  }, []);

  return (
    <div>
      <ActionHeader title="Listado de Personas" onAdd={() => router.push("/drawer/editarPersona")} />
      <ul>
        {vm.personas.map(p => (
          <li key={p._id} className="flex justify-between p-2 border-b">
            <span>{p._nombre} {p._apellidos} - {p.nombreDepartamento}</span>
            <div>
              <button onClick={() => router.push(`/drawer/editarPersona?id=${p._id}`)} className="text-blue-500 mr-2">Editar</button>
              <button onClick={() => vm.eliminarPersona(p._id)} className="text-red-500">Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ListadoPersonasView;
