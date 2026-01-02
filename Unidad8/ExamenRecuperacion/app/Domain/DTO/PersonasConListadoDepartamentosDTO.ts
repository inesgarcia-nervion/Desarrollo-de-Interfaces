import { Persona } from "../Entities/Persona";
import { Departamento } from "../Entities/Departamento";

export class PersonasConListadoDepartamentosDTO {
    constructor(
        public Personas: Persona[],
        public ListadoDepartamentos: Departamento[]
    ) {}
}
