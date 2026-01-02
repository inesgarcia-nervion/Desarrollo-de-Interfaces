import { Persona } from "../../Domain/Entities/Persona";
import { Departamento } from "../../Domain/Entities/Departamento";
import { PersonaUI } from "../Models/PersonaUI";
import { DepartamentoUI } from "../Models/DepartamentoUI";

export class PersonaMapper {
    static toPersonaUI(persona: Persona): PersonaUI {
        return {
        id: persona.id,
        nombreCompleto: `${persona.nombre} ${persona.apellidos}`,
        departamentoSeleccionadoId: undefined,
        colorFila: "white"
        };
    }

    static toDepartamentoUI(dep: Departamento): DepartamentoUI {
        return {
        id: dep.idDepartamento,
        nombre: dep.nombreDepartamento,
        color: dep.color
        };
    }

    static asignarColor(persona: PersonaUI, departamentos: DepartamentoUI[]): PersonaUI {
        const dep = departamentos.find(d => d.id === persona.departamentoSeleccionadoId);
        return {
        ...persona,
        colorFila: dep ? dep.color : "white"
        };
    }
}
