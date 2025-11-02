import { Persona } from "../../entities/Persona";

export interface IPersonasUseCase {
    getPersonaDelDia(): Persona;
}