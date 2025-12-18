import { injectable, inject } from "inversify";
import { TYPES } from "../../Core/types";
import { Persona } from "../Entities/Persona";
import { IPersonaRepository } from "../Interfaces/Repositories/IPersonaRepository";


@injectable()
export class GetPersonasUseCases {
    constructor(
        @inject(TYPES.IPersonaRepository) private personaRepository: IPersonaRepository
    ) {
        
    }

    async execute(): Promise<Persona[]> {
        return this.personaRepository.getPersonas();
    }
}