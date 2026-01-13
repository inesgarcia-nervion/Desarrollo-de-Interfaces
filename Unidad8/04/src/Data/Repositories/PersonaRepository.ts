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
    return this.api.post<number>("personas", persona);
  }

  async EditarPersona(persona: Persona): Promise<number> {
    return this.api.put<number>(`personas/${persona._id}`, persona);
  }

  async EliminarPersona(id: number): Promise<number> {
    return this.api.delete<number>(`personas/${id}`);
  }
}
