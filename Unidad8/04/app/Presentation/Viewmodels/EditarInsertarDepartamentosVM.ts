import { useState } from "react";
import { container } from "../../Core/container";
import { TYPES } from "../../Core/types";
import { Departamento } from "../../Domain/Entities/Departamento";
import type { IDepartamentoUseCase } from "../../Domain/Interfaces/Usecases/IDepartamentoUseCase";

export const EditarInsertarDepartamentosVM = (deptoEdit?: Departamento) => {
    const uc = container.get<IDepartamentoUseCase>(TYPES.IDepartamentoUseCase);
    const [nombre, setNombre] = useState(deptoEdit?._nombre ?? "");

    const guardar = async () => {
        const d = new Departamento(deptoEdit?._id ?? 0, nombre);
        
        if (deptoEdit) {
            await uc.EditarDepartamento(d);
        } else {
            await uc.InsertarDepartamento(d);
        }
    };

    return { nombre, setNombre, guardar };
};