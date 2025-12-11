import {Persona} from "../../Entities/Persona";


// Regla de negocio: filtrar personas por nombre
export interface IPersonasRepositoryUseCase {
    getListadoCompleto(): Promise<Persona[]>;
    getListadoFiltradoPorNombre(nombre : string): Persona[];
}
