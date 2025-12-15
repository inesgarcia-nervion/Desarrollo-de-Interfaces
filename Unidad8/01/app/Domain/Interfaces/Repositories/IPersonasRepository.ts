import { Persona } from "../../Entities/Persona";

export interface IPersonasRepository {
    // CAMBIO 2: Ahora devuelve una Promesa
    getListadoCompletoPersonas(): Promise<Persona[]>;
    getPersonaPorId(id: number): Promise<Persona | undefined>;
}
