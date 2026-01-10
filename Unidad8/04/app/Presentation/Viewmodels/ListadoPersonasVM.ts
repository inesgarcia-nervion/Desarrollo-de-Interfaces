import { useState } from "react";
import { Alert } from "react-native";
import { container } from "../../Core/container";
import { TYPES } from "../../Core/types";
import { Persona } from "../../Domain/Entities/Persona";
import { Departamento } from "../../Domain/Entities/Departamento";
import type { IPersonaUseCase } from "../../Domain/Interfaces/Usecases/IPersonaUseCase";
import type { IDepartamentoUseCase } from "../../Domain/Interfaces/Usecases/IDepartamentoUseCase";

export const ListadoPersonasVM = () => {
    const pUC = container.get<IPersonaUseCase>(TYPES.IPersonaUseCase);
    const dUC = container.get<IDepartamentoUseCase>(TYPES.IDepartamentoUseCase);

    const [personas, setPersonas] = useState<Persona[]>([]);
    const [original, setOriginal] = useState<Persona[]>([]); // Para el filtro
    const [deptos, setDeptos] = useState<Departamento[]>([]);
    const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona | null>(null); // Guardamos el objeto
    const [puedeEliminar, setPuedeEliminar] = useState(true);

    const loadData = async () => {
        const dto = await pUC.getPersonaMayorDeEdadDTO();
        const dtoDel = await pUC.getEliminarPersonaDTO();
        const listDeptos = await dUC.GetListadoDepartamentos();
        setPersonas(dto.ListadoPersona);
        setOriginal(dto.ListadoPersona);
        setDeptos(listDeptos);
        setPuedeEliminar(dtoDel.puedeEliminar);
        setPersonaSeleccionada(null); // Limpiar selección al recargar
    };

    const filtrar = (texto: string) => {
        const filtrados = original.filter(p => 
            p._nombre.toLowerCase().includes(texto.toLowerCase()) || 
            p._apellidos.toLowerCase().includes(texto.toLowerCase())
        );
        setPersonas(filtrados);
    };

    const seleccionar = (p: Persona) => {
        setPersonaSeleccionada(personaSeleccionada?._id === p._id ? null : p);
    };

    const eliminarAction = async () => {
        if (!personaSeleccionada) return;
        try {
            await pUC.EliminarPersona(personaSeleccionada._id);
            await loadData();
        } catch (e: any) { Alert.alert("Error", e.message); }
    };

    return { 
        personas, deptos, personaSeleccionada, seleccionar, 
        puedeEliminar, loadData, eliminarAction, filtrar 
    };
};