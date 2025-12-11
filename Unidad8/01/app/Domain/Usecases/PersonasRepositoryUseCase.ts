import { injectable, inject } from "inversify";
import { TYPES } from "../../Core/types";
import { IPersonasRepository } from "../Interfaces/Repositories/IPersonasRepository";
import { IPersonasRepositoryUseCase } from "../Interfaces/Usecases/IPersonasRepositoryUseCase";
import { Persona } from "../Entities/Persona";

@injectable()
export class PersonasUseCases implements IPersonasRepositoryUseCase {

    constructor(
        @inject(TYPES.IPersonasRepository)
        private personasRepository: IPersonasRepository
    ) {}

    getListadoFiltradoPorNombre(nombre: string): Persona[] {
        const listado = this.personasRepository.getListadoCompletoPersonas();
        return listado.filter(p =>
            p.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
    }

    getListadoCompleto(): Persona[] {
        return this.personasRepository.getListadoCompletoPersonas();
    }
}
