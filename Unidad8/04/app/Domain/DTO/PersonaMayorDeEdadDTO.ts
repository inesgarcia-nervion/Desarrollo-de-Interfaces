import { Persona } from "../Entities/Persona";
export class PersonaMayorDeEdadDTO {
    constructor(public ListadoPersona: Persona[], public diaSemana: number) {}
}