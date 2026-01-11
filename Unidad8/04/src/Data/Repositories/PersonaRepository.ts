import { injectable, inject } from "inversify";
import { TYPES } from "../../Core/types";
import { BaseApi } from "../../Core/BaseApi";
import { Persona } from "../../Domain/Entities/Persona";
import type { IPersonaRepository } from "../../Domain/Interfaces/Repositories/IPersonaRepository";

// Función para mapear la entidad Persona al formato de la API
function mapPersonaToApi(p: Persona) {
    return {
        id: p._id,
        nombre: p._nombre,
        apellido: p._apellidos,
        edad: p._edad,
        fechaNacimiento: p._fechaNacimiento,
        direccion: p._direccion,
        telefono: p._telefono,
        idDepartamento: p._idDepartamento,
        foto: p._foto
    };
}

@injectable()
export class PersonaRepository implements IPersonaRepository {
    constructor(@inject(TYPES.BaseApi) private api: BaseApi) {}

    async GetListadoPersonas() { return this.api.get<Persona[]>("Personas"); }
    async GetPersonaPorId(id: number) { return this.api.get<Persona>(`Personas/${id}`); }
    async InsertarPersona(p: Persona) { return this.api.post<number>("Personas", mapPersonaToApi(p)); }
    async EditarPersona(p: Persona) { return this.api.put<number>(`Personas/${p._id}`, mapPersonaToApi(p)); }
    async EliminarPersona(id: number) { return this.api.delete<number>(`Personas/${id}`); }
}