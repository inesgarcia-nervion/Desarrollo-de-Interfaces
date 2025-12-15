import {Persona} from "../../Entities/Persona";


// Regla de negocio: filtrar personas por nombre
// CAMBIO 3
export interface IPersonasRepositoryUseCase {
    getListadoCompleto(): Promise<Persona[]>;
    getListadoFiltradoPorNombre(nombre : string): Promise<Persona[]>;
}
