// Data/Repositories/PersonaRepository.ts
import { IPersonaRepository } from "../../Domain/Interfaces/Repositories/IPersonaRepository";
import { Persona } from "../../Domain/Entities/Persona";
import { BaseApi } from "../../Core/BaseApi";

export class PersonaRepository implements IPersonaRepository {
    getAll() {
        throw new Error("Method not implemented.");
    }
    constructor(private baseApi: BaseApi) {}

    async GetListadoPersonasRepository(): Promise<Persona[]> {
        const data = await this.baseApi.get<any[]>("/personas");
        return data.map(p => new Persona(p.persona.id, p.persona.nombre, p.persona.apellido, p.persona.idDepartamento));
    }

    async GetPersonaPorId(id: number): Promise<Persona> {
        const p = await this.baseApi.get<any>(`/personas/${id}`);
        return new Persona(p.persona.id, p.persona.nombre, p.persona.apellido, p.persona.idDepartamento);
    }
}
