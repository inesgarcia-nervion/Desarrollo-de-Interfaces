import { useState, useEffect } from "react";
import { PersonaUI } from "../Models/PersonaUI";
import { DepartamentoUI } from "../Models/DepartamentoUI";
import { PersonaMapper } from "../Mappers/PersonaMapper";
import { Persona } from "../../Domain/Entities/Persona";
import { container } from "../../Core/container";

export const usePersonasVM = () => {
    const [personas, setPersonas] = useState<PersonaUI[]>([]);
    const [departamentos, setDepartamentos] = useState<DepartamentoUI[]>([]);
    const [personasCorrectas, setPersonasCorrectas] = useState<Persona[]>([]);
    const [resultado, setResultado] = useState<string>("");

    useEffect(() => {
        loadPersonas();
    }, []);

    const loadPersonas = async () => {
        const dto = await container.personaUsecase.GetPersonasConListadoDepartamentos();
        setPersonas(dto.Personas.map(PersonaMapper.toPersonaUI));
        setDepartamentos(dto.ListadoDepartamentos.map(PersonaMapper.toDepartamentoUI));
        setPersonasCorrectas(dto.Personas);
    };

    const seleccionarDepartamento = (idPersona: number, idDepartamento: string) => {
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
            idDepartamento: parseInt(p.departamentoSeleccionadoId || '0')
        })),
        ListadoDepartamentos: []
        };
        const res = await container.personaUsecase.GetResultado(dto as any);
        setResultado(res.mensajeHaGanado);
        // Actualizar colores basados en si son correctos
        setPersonas(prev => prev.map(p => {
            const correcta = personasCorrectas.find(pc => pc.id === p.id);
            const esCorrecta = correcta && parseInt(p.departamentoSeleccionadoId || '0') === correcta.idDepartamento;
            return {
                ...p,
                colorFila: esCorrecta ? 'lightgreen' : 'lightcoral'
            };
        }));
    };

    return { personas, departamentos, seleccionarDepartamento, comprobar, resultado };
};
