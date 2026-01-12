import { useState, useCallback, useRef } from "react";
import { Alert } from "react-native";
import { container } from "../../Core/container";
import { TYPES } from "../../Core/types";
import { Persona } from "../../Domain/Entities/Persona";

export const useListadoPersonasVM = () => {
    const pUCRef = useRef(container.get<any>(TYPES.IPersonaUseCase));
    const pUC = pUCRef.current;

    const [personas, setPersonas] = useState<Persona[]>([]);
    const [original, setOriginal] = useState<Persona[]>([]);
    const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona | null>(null);
    const [puedeEliminar, setPuedeEliminar] = useState(true);
    const [loading, setLoading] = useState(false);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const dto = await pUC.getPersonaMayorDeEdadDTO();
            const dtoDel = await pUC.getEliminarPersonaDTO();
            
            // Garantizamos que siempre sea un array
            const listaValida = Array.isArray(dto.ListadoPersona) ? dto.ListadoPersona : [];
            
            setPersonas(listaValida);
            setOriginal(listaValida);
            setPuedeEliminar(dtoDel.puedeEliminar);
            setPersonaSeleccionada(null);
        } catch (e) {
            setPersonas([]);
            setOriginal([]);
        } finally {
            setLoading(false);
        }
    }, [pUC]);

    const filtrar = useCallback((texto: string) => {
        if (!texto || !original) {
            setPersonas(original || []);
            return;
        }
        const filtrados = original.filter(p => 
            (p._nombre?.toLowerCase().includes(texto.toLowerCase())) || 
            (p._apellidos?.toLowerCase().includes(texto.toLowerCase()))
        );
        setPersonas(filtrados);
    }, [original]);

    const seleccionar = useCallback((p: Persona) => {
        setPersonaSeleccionada(prev => (prev?._id === p._id ? null : p));
    }, []);

    const eliminarAction = useCallback(async () => {
        if (!personaSeleccionada) return;
        try {
            await pUC.EliminarPersona(personaSeleccionada._id);
            await loadData();
        } catch (e: any) { 
            Alert.alert("Error", e.message); 
        }
    }, [personaSeleccionada, pUC, loadData]);

    return { 
        personas, personaSeleccionada, seleccionar, 
        puedeEliminar, loadData, eliminarAction, filtrar, loading 
    };
};