import { injectable } from "inversify";
import { BaseApi } from "../../Data/Api/BaseApi";
import { Departamento } from "../../Domain/Entities/Departamento";
import { IDepartamentoRepository } from "../../Domain/Interfaces/Repositories/IDepartamentoRepository";

@injectable()
export class DepartamentoRepository implements IDepartamentoRepository {
  constructor(private api: BaseApi = new BaseApi()) {}

  async GetListadoDepartamentos(): Promise<Departamento[]> {
    return this.api.get<Departamento[]>("departamentos");
  }

  async GetDepartamentoPorId(id: number): Promise<Departamento> {
    return this.api.get<Departamento>(`departamentos/${id}`);
  }

  async InsertarDepartamento(departamento: Departamento): Promise<number> {
    // normalize possible DTO fields (_nombre) to backend expected shape
    const payload: any = {
      nombre: (departamento as any)._nombre ?? (departamento as any).nombre ?? ""
    };
    console.debug('[DepartamentoRepository] Insert payload:', payload);
    return this.api.post<number>("departamentos", payload);
  }

  async EditarDepartamento(departamento: Departamento): Promise<number> {
    const id = (departamento as any).id ?? (departamento as any)._id;
    const payload: any = {
      nombre: (departamento as any)._nombre ?? (departamento as any).nombre ?? ""
    };
    console.debug('[DepartamentoRepository] Edit payload:', id, payload);
    return this.api.put<number>(`departamentos/${id}`, payload);
  }

  async EliminarDepartamento(idDepartamento: number): Promise<number> {
    return this.api.delete<number>(`departamentos/${idDepartamento}`);
  }

  async ContarPersonasEnDepartamento(idDepartamento: number): Promise<number> {
    return this.api.get<number>(`departamentos/${idDepartamento}/personas/count`);
  }
}
