import { useState, useCallback } from "react";

export enum VistaActiva {
    PERSONAS = 'PERSONAS',
    DEPARTAMENTOS = 'DEPARTAMENTOS',
    NINGUNA = 'NINGUNA'
}

export const useHomeVM = () => {
    const [vista, setVista] = useState<VistaActiva>(VistaActiva.NINGUNA);

    const mostrarPersonas = useCallback(() => setVista(VistaActiva.PERSONAS), []);
    const mostrarDeptos = useCallback(() => setVista(VistaActiva.DEPARTAMENTOS), []);

    return {
        vista,
        mostrarPersonas,
        mostrarDeptos
    };
};