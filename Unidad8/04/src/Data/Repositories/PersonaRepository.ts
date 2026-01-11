import { injectable, inject } from "inversify";
import { TYPES } from "../../Core/types";
import { BaseApi } from "../../Core/BaseApi";
import { Persona } from "../../Domain/Entities/Persona";
import type { IPersonaRepository } from "../../Domain/Interfaces/Repositories/IPersonaRepository";

@injectable()
export class PersonaRepository implements IPersonaRepository {
    constructor(@inject(TYPES.BaseApi) private api: BaseApi) {}

    async GetListadoPersonas() { return this.api.get<Persona[]>("Personas"); }
    async GetPersonaPorId(id: number) { return this.api.get<Persona>(`Personas/${id}`); }
    async InsertarPersona(p: Persona) { return this.api.post<number>("Personas", p); }
    async EditarPersona(p: Persona) { return this.api.put<number>(`Personas/${p._id}`, p); }
    async EliminarPersona(id: number) { return this.api.delete<number>(`Personas/${id}`); }
}