import type { Persona } from "../../Entities/Persona";

export interface IPersonaRepository {
    GetListadoPersonas(): Promise<Persona[]>;
    GetPersonaPorId(id: number): Promise<Persona>;
    InsertarPersona(persona: Persona): Promise<number>;
    EditarPersona(persona: Persona): Promise<number>;
    EliminarPersona(id: number): Promise<number>;
}