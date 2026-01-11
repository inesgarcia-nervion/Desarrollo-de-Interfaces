import type { Persona } from "../../Entities/Persona";
import type { PersonaMayorDeEdadDTO } from "../../DTO/PersonaMayorDeEdadDTO";
import type { EliminarPersonaDTO } from "../../DTO/EliminarPersonaDTO";

export interface IPersonaUseCase {
    getPersonaMayorDeEdadDTO(): Promise<PersonaMayorDeEdadDTO>;
    getEliminarPersonaDTO(): Promise<EliminarPersonaDTO>;
    InsertarPersona(persona: Persona): Promise<number>;
    EditarPersona(persona: Persona): Promise<number>;
    EliminarPersona(id: number): Promise<number>;
}