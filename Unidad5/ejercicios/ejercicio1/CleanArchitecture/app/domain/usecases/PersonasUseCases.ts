import { injectable, inject } from "inversify";  
import {TYPES } from "../../core/types"

import { IPersonasRepository } from "../interfaces/repositories/IPersonasRepository";   
import { IPersonasRepositoryUseCase } from "../interfaces/repositories/IPersonasRepositoryUseCase";
import { Persona } from "../entities/Persona";


@injectable()
export class PersonasUseCases implements IPersonasRepositoryUseCase {


    constructor(
        @inject(TYPES.IPersonasRepository) 
        private personasRepository: IPersonasRepository
    ) {}
    
    // Filtrado de personas por nombre
    getListadoFiltradoPorNombre(nombre: string): Persona[] {
        const listado = this.personasRepository.getListadoCompletoPersonas();
        return listado.filter(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }
    //Devuelve un listado completo 
     getListadoCompleto(): Persona[] {
        const listado = this.personasRepository.getListadoCompletoPersonas();
        return listado;
    }
    

    //Ejemplo de Regla de negocio: Personas mayores de 18 (en el caso de que incomporasemos las edades de cada usuario)
        

}