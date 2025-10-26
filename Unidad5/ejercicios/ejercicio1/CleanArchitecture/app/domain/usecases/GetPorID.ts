import { IPersonasRepository } from "../interfaces/repositories/IPersonasRepository";   
import { Persona } from "../entities/Persona";

export class GetPorID {
    private personasRepository: IPersonasRepository;

    constructor(personasRepository: IPersonasRepository) {
        this.personasRepository = personasRepository;
    }
    
    execute(id: number): Persona | undefined {
        return this.personasRepository.getPersonaPorId(id);
    }       

}