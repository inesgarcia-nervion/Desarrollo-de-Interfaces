import { useState, useCallback, useRef } from "react";
import { Alert } from "react-native";
import { container } from "../../Core/container";
import { TYPES } from "../../Core/types";
import { Departamento } from "../../Domain/Entities/Departamento";
import { IDepartamentoUseCase } from "../../Domain/Interfaces/Usecases/IDepartamentoUseCase";

export const useListadoDepartamentosVM = () => {
    const ucRef = useRef(container.get<IDepartamentoUseCase>(TYPES.IDepartamentoUseCase));
    const uc = ucRef.current;
    const isLoadingRef = useRef(false);
    
    const [deptos, setDeptos] = useState<Departamento[]>([]);
    const [original, setOriginal] = useState<Departamento[]>([]);
    const [deptoSeleccionado, setDeptoSeleccionado] = useState<Departamento | null>(null);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async () => {
        // Prevenir múltiples llamadas simultáneas
        if (isLoadingRef.current) return;
        isLoadingRef.current = true;
        setLoading(true);
        
        try {
            const data = await uc.GetListadoDepartamentos();
            setDeptos(data);
            setOriginal(data);
            setDeptoSeleccionado(null);
        } catch (error: any) {
            console.error("Error loading departamentos:", error);
            Alert.alert("Error", "No se pudieron cargar los departamentos. Verifica tu conexión a internet.");
            setDeptos([]);
            setOriginal([]);
        } finally {
            isLoadingRef.current = false;
            setLoading(false);
        }
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

    return { deptos, load, filtrar, seleccionar, deptoSeleccionado, eliminarAction, loading };
};