import { injectable } from "inversify";
import { IPersonasRepository } from "../../Domain/Interfaces/Repositories/IPersonasRepository";
import { Persona } from "../../Domain/Entities/Persona";

@injectable()
export class PersonasRepositoryEmpty implements IPersonasRepository {

    getListadoCompletoPersonas(): Persona[] {
        return [];
    }

    getPersonaPorId(id: number): Persona | undefined {
        return this.getListadoCompletoPersonas().find(p => p.id === id);
    }
}
