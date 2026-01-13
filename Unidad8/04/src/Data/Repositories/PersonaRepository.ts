import { injectable } from "inversify";
import { BaseApi } from "../../Data/Api/BaseApi";
import { IPersonaRepository } from "../../Domain/Interfaces/Repositories/IPersonaRepository";
import { Persona } from "../../Domain/Entities/Persona";

@injectable()
export class PersonaRepository implements IPersonaRepository {
  constructor(private api: BaseApi = new BaseApi()) {}

  async GetListadoPersonas(): Promise<Persona[]> {
    return this.api.get<Persona[]>("personas");
  }

  async GetPersonaPorId(id: number): Promise<Persona> {
    return this.api.get<Persona>(`personas/${id}`);
  }

  async InsertarPersona(persona: Persona): Promise<number> {
    // map domain/entity/DTO shape to API payload (no leading underscores, fecha as ISO)
    const payload: any = {
      nombre: (persona as any)._nombre ?? (persona as any).nombre,
      apellido: (persona as any)._apellidos ?? (persona as any).apellidos ?? (persona as any).apellido,
      // edad se calcula en backend a partir de fechaNacimiento; no la enviamos
      fechaNacimiento: (persona as any)._fechaNacimiento ? ((persona as any)._fechaNacimiento instanceof Date ? (persona as any)._fechaNacimiento.toISOString() : (persona as any)._fechaNacimiento) : undefined,
      direccion: (persona as any)._direccion ?? (persona as any).direccion,
      telefono: (persona as any)._telefono ?? (persona as any).telefono,
      foto: (persona as any)._foto ?? (persona as any).foto ?? null,
      idDepartamento: (persona as any)._idDepartamento ?? (persona as any).idDepartamento ?? 0
    };

    return this.api.post<number>("personas", payload);
  }

  async EditarPersona(persona: Persona): Promise<number> {
    const payload: any = {
      id: (persona as any)._id ?? (persona as any).id,
      nombre: (persona as any)._nombre ?? (persona as any).nombre,
      apellido: (persona as any)._apellidos ?? (persona as any).apellidos ?? (persona as any).apellido,
      fechaNacimiento: (persona as any)._fechaNacimiento ? ((persona as any)._fechaNacimiento instanceof Date ? (persona as any)._fechaNacimiento.toISOString() : (persona as any)._fechaNacimiento) : undefined,
      direccion: (persona as any)._direccion ?? (persona as any).direccion,
      telefono: (persona as any)._telefono ?? (persona as any).telefono,
      foto: (persona as any)._foto ?? (persona as any).foto ?? null,
      idDepartamento: (persona as any)._idDepartamento ?? (persona as any).idDepartamento ?? 0
    };
    // log payload for debugging server-side validation errors
    try {
      console.debug('[PersonaRepository] PUT payload:', payload);
    } catch (e) {
      // noop in environments without console
    }

    return this.api.put<number>(`personas/${payload.id}`, payload);
  }

  async EliminarPersona(id: number): Promise<number> {
    return this.api.delete<number>(`personas/${id}`);
  }
}
