import { Persona } from "../Entities/Persona";
export class EliminarPersonaDTO {
    constructor(public ListadoPersona: Persona[], public diaSemana: number, public puedeEliminar: boolean) {}
}