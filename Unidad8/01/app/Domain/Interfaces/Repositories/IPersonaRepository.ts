import { Persona } from "../../Entities/Persona";

export interface IPersonaRepository {
    getPersonas(): Promise<Persona[]>;
}