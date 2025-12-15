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


    // CAMBIO 5 
    async getListadoCompleto(): Promise<Persona[]> {
        // Esperamos a que el repo traiga los datos
        return await this.personasRepository.getListadoCompletoPersonas();
    }

    async getListadoFiltradoPorNombre(nombre: string): Promise<Persona[]> {
        const listado = await this.personasRepository.getListadoCompletoPersonas();
        return listado.filter(p =>
            p.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
    }
}
