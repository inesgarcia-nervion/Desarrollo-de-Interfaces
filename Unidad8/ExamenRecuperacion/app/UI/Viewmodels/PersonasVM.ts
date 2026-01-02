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
        setPersonas(dto.Personas.map(PersonaMapper.toPersonaUI));
        setDepartamentos(dto.ListadoDepartamentos.map(PersonaMapper.toDepartamentoUI));
    };

    const seleccionarDepartamento = (idPersona: number, idDepartamento: number) => {
        setPersonas(prev =>
        prev.map(p =>
            p.id === idPersona
            ? PersonaMapper.asignarColor({ ...p, departamentoSeleccionadoId: idDepartamento }, departamentos)
            : p
        )
        );
    };

    const comprobar = async () => {
        const dto = {
        Personas: personas.map(p => ({
            id: p.id,
            idDepartamento: p.departamentoSeleccionadoId
        })),
        ListadoDepartamentos: []
        };
        const res = await container.personaUsecase.GetResultado(dto as any);
        setResultado(res.mensajeHaGanado);
    };

    return { personas, departamentos, seleccionarDepartamento, comprobar, resultado };
};
