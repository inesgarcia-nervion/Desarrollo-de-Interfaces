import { useState, useCallback, useRef } from "react";
import { container } from "../../Core/container";
import { TYPES } from "../../Core/types";
import { Departamento } from "../../Domain/Entities/Departamento";
import { IDepartamentoUseCase } from "../../Domain/Interfaces/Usecases/IDepartamentoUseCase";

export const useListadoDepartamentosVM = () => {
    const ucRef = useRef(container.get<IDepartamentoUseCase>(TYPES.IDepartamentoUseCase));
    const uc = ucRef.current;
    
    const [deptos, setDeptos] = useState<Departamento[]>([]);
    const [original, setOriginal] = useState<Departamento[]>([]);
    const [deptoSeleccionado, setDeptoSeleccionado] = useState<Departamento | null>(null);

    const load = useCallback(async () => {
        const data = await uc.GetListadoDepartamentos();
        setDeptos(data);
        setOriginal(data);
        setDeptoSeleccionado(null);
    }, [uc]);

    const seleccionar = useCallback((d: Departamento) => {
        setDeptoSeleccionado(prev => prev?._id === d._id ? null : d);
    }, []);

    const filtrar = useCallback((texto: string) => {
        if (!texto) {
            setDeptos(original);
            return;
        }
        setDeptos(original.filter(d => d._nombre.toLowerCase().includes(texto.toLowerCase())));
    }, [original]);

    const eliminarAction = useCallback(async () => {
        if (!deptoSeleccionado) return;
        await uc.EliminarDepartamento(deptoSeleccionado._id);
        await load();
    }, [deptoSeleccionado, uc, load]);

    return { deptos, load, filtrar, seleccionar, deptoSeleccionado, eliminarAction };
};