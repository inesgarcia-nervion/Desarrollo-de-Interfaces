import {Persona} from "../../entities/Persona";


export interface IPersonasRepository {
    getListadoCompletoPersonas(): Persona[];
    getPersonaPorId(id: number): Persona | undefined;           //Caso de uso adicional
}