import { useState, useEffect } from "react";
import { PersonaUI } from "../Models/PersonaUI";
import { DepartamentoUI } from "../Models/DepartamentoUI";
import { PersonaMapper } from "../Mappers/PersonaMapper";
import { container } from "../../Core/container";

export const usePersonasVM = () => {
    const [personas, setPersonas] = useState<PersonaUI[]>([]);
    const [departamentos, setDepartamentos] = useState<DepartamentoUI[]>([]);
    const [resultado, setResultado] = useState<string>("");

    useEffect(() => {
        loadPersonas();
    }, []);

    const loadPersonas = async () => {
        const dto = await container.personaUsecase.GetPersonasConListadoDepartamentos();
        let personasUI = dto.Personas.map(PersonaMapper.toPersonaUI);
        setDepartamentos(dto.ListadoDepartamentos.map(PersonaMapper.toDepartamentoUI));
        // Asignar colores correctos desde el inicio
        personasUI = personasUI.map(p => {
            const correcta = dto.Personas.find(pc => pc.id === p.id);
            const depCorrecto = dto.ListadoDepartamentos.find(d => d.idDepartamento === correcta?.idDepartamento);
            const depUI = depCorrecto ? PersonaMapper.toDepartamentoUI(depCorrecto) : null;
            return { ...p, colorFila: depUI ? depUI.color : "white" };
        });
        setPersonas(personasUI);
    };

    const seleccionarDepartamento = (idPersona: number, idDepartamento: string) => {
        setPersonas(prev =>
        prev.map(p =>
            p.id === idPersona
            ? { ...p, departamentoSeleccionadoId: idDepartamento }
            : p
        )
        );
    };

    const comprobar = async () => {
        const dto = {
        Personas: personas.map(p => ({
            id: p.id,
            idDepartamento: parseInt(p.departamentoSeleccionadoId || '0')
        })),
        ListadoDepartamentos: []
        };
        const res = await container.personaUsecase.GetResultado(dto as any);
        setResultado(res.mensajeHaGanado);
    };

    return { personas, departamentos, seleccionarDepartamento, comprobar, resultado };
};
