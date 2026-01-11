import { useState, useCallback, useRef } from "react";
import { container } from "../../Core/container";
import { TYPES } from "../../Core/types";
import { Departamento } from "../../Domain/Entities/Departamento";
import type { IDepartamentoUseCase } from "../../Domain/Interfaces/Usecases/IDepartamentoUseCase";

export const useEditarInsertarDepartamentosVM = (deptoEdit?: Departamento) => {
    const ucRef = useRef(container.get<IDepartamentoUseCase>(TYPES.IDepartamentoUseCase));
    const uc = ucRef.current;
    const [nombre, setNombre] = useState(deptoEdit?._nombre ?? "");

    const guardar = useCallback(async () => {
        const d = new Departamento(deptoEdit?._id ?? 0, nombre);
        
        if (deptoEdit) {
            await uc.EditarDepartamento(d);
        } else {
            await uc.InsertarDepartamento(d);
        }
    }, [deptoEdit, nombre, uc]);

    return { nombre, setNombre, guardar };
};