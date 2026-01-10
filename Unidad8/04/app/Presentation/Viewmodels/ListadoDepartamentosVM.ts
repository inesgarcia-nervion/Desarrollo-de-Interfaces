import { useState } from "react";
import { container } from "../../Core/container";
import { TYPES } from "../../Core/types";
import { Departamento } from "../../Domain/Entities/Departamento";
import { IDepartamentoUseCase } from "../../Domain/Interfaces/Usecases/IDepartamentoUseCase";

export const ListadoDepartamentosVM = () => {
    const uc = container.get<IDepartamentoUseCase>(TYPES.IDepartamentoUseCase);
    
    const [deptos, setDeptos] = useState<Departamento[]>([]);
    const [original, setOriginal] = useState<Departamento[]>([]);
    const [deptoSeleccionado, setDeptoSeleccionado] = useState<Departamento | null>(null);

    const load = async () => {
        const data = await uc.GetListadoDepartamentos();
        setDeptos(data);
        setOriginal(data);
        setDeptoSeleccionado(null);
    };

    const seleccionar = (d: Departamento) => {
        setDeptoSeleccionado(deptoSeleccionado?._id === d._id ? null : d);
    };

    const filtrar = (texto: string) => {
        setDeptos(original.filter(d => d._nombre.toLowerCase().includes(texto.toLowerCase())));
    };

    const eliminarAction = async () => {
        if (!deptoSeleccionado) return;
        await uc.EliminarDepartamento(deptoSeleccionado._id);
        await load();
    };

    return { deptos, load, filtrar, seleccionar, deptoSeleccionado, eliminarAction };
};