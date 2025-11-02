import { injectable, inject } from "inversify";  
import {TYPES } from "../../core/types"

import { IPersonasRepository } from "../interfaces/repositories/IPersonasRepository";   
import { IPersonasUseCase } from "../../domain/interfaces/repositories/IPersonasUseCase";
import { Persona } from "../entities/Persona";


@injectable()
export class PersonasUseCases implements IPersonasUseCase {


    constructor(
        @inject(TYPES.IPersonasRepository) 
        private personasRepository: IPersonasRepository
    ) {}
    getPersonaDelDia(): Persona {
        const personas = this.personasRepository.getListadoCompletoPersonas();
        const day = new Date().getDay();
        const index = day % personas.length;
        return personas[index];
    }
}
