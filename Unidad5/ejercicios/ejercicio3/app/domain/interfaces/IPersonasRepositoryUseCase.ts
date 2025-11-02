import { Persona } from "../entities/Persona";

export interface IPersonasRepositoryUseCase {
    getPersonaDelDia(): Persona;
}