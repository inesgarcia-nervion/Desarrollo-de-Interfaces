import { IPersonasRepository } from "../interfaces/IPersonasRepository";   
import { IPersonasRepositoryUseCase } from "../interfaces/IPersonasRepositoryUseCase";
import { Persona } from "../entities/Persona";



export class PersonasUseCases implements IPersonasRepositoryUseCase {
    
    constructor(
        private personaRepository: IPersonasRepository
    ) {}

    getPersonaDelDia(): Persona {
        const personas = this.personaRepository.getListadoCompletoPersonas();   //Aquí estamos llamando al repositorio para obtener la lista completa de personas.
        const day = new Date().getDay(); // Domingo=0, Lunes=1, ..., Sábado=6
        const index = day % personas.length; // Garantiza índice válido (0-6)
        return personas[index];
    }

} 