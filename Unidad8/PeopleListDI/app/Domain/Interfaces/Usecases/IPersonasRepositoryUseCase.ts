import {Persona} from "../../Entities/Persona";


// Regla de negocio: filtrar personas por nombre
export interface IPersonasRepositoryUseCase {
    getListadoFiltradoPorNombre(nombre : string): Persona[];
}