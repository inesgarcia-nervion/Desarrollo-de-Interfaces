import { injectable, inject } from "inversify";
import { TYPES } from "../../Core/types";
import { IPersonasRepository } from "../Interfaces/Repositories/IPersonaRepository";
import { Persona } from "../Entities/Persona";

@injectable()
export class GetPersonasUseCases  {
    private personasRepository: IPersonasRepository;

    constructor(@inject(TYPES.IPersonasRepository) personasRepository : IPersonasRepository{
        this.personasRepository: personasRepository;
    }

    async execute() : Promise<Persona[]> {
        return this.personasRepository.getPersonas();
    }



   /* // CAMBIO 5 
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
        */
}
