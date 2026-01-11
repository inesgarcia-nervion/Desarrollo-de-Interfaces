import { injectable, inject } from "inversify";
import { TYPES } from "../../Core/types";
import { BaseApi } from "../../Core/BaseApi";
import { Persona } from "../../Domain/Entities/Persona";
import type { IPersonaRepository } from "../../Domain/Interfaces/Repositories/IPersonaRepository";

// Función para mapear la entidad Persona al formato de la API
function mapPersonaToApi(p: Persona) {
    // Si no hay fecha de nacimiento, usar la fecha actual
    const fechaNacimiento = p._fechaNacimiento || new Date().toISOString().split('T')[0];
    
    const payload: any = {
        nombre: p._nombre,
        apellido: p._apellidos,
        edad: p._edad,
        fechaNacimiento: fechaNacimiento,
        idDepartamento: parseInt(String(p._idDepartamento))
    };
    
    // Solo añadir campos opcionales si tienen valor
    if (p._direccion) payload.direccion = p._direccion;
    if (p._telefono) payload.telefono = p._telefono;
    if (p._foto) payload.foto = p._foto;
    
    // Solo añadir id si no es una nueva persona
    if (p._id !== 0) {
        payload.id = p._id;
    }
    
    return payload;
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