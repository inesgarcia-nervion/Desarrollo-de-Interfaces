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
    return this.api.post<number>("departamentos", departamento);
  }

  async EditarDepartamento(departamento: Departamento): Promise<number> {
    return this.api.put<number>(`departamentos/${departamento.id}`, departamento);
  }

  async EliminarDepartamento(idDepartamento: number): Promise<number> {
    return this.api.delete<number>(`departamentos/${idDepartamento}`);
  }

  async ContarPersonasEnDepartamento(idDepartamento: number): Promise<number> {
    return this.api.get<number>(`departamentos/${idDepartamento}/personas/count`);
  }
}
