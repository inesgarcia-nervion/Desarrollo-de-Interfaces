import { Persona } from "../../Entities/Persona";

export interface IPersonaRepository {
    GetListadoPersonasRepository(): Promise<Persona[]>;
    GetPersonaPorId(id: number): Promise<Persona>;
}
