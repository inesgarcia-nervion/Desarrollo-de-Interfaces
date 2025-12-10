import { Persona } from "../../Entities/Persona";

export interface IPersonasRepository {
    getListadoCompletoPersonas(): Persona[];
    getPersonaPorId(id: number): Persona | undefined;
}
