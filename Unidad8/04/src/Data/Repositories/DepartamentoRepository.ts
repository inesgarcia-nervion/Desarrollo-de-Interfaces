import { injectable, inject } from "inversify";
import { TYPES } from "../../Core/types";
import { BaseApi } from "../../Core/BaseApi";
import { Departamento } from "../../Domain/Entities/Departamento";
import type { IDepartamentoRepository } from "../../Domain/Interfaces/Repositories/IDepartamentoRepository";

@injectable()
export class DepartamentoRepository implements IDepartamentoRepository {
    constructor(@inject(TYPES.BaseApi) private api: BaseApi) {}

    async GetListadoDepartamentos() { return this.api.get<Departamento[]>("Departamentos"); }
    async GetDepartamentoPorId(id: number) { return this.api.get<Departamento>(`Departamentos/${id}`); }
    async InsertarDepartamento(d: Departamento) { return this.api.post<number>("Departamentos", d); }
    async EditarDepartamento(d: Departamento) { return this.api.put<number>(`Departamentos/${d._id}`, d); }
    async EliminarDepartamento(id: number) { return this.api.delete<number>(`Departamentos/${id}`); }
    async ContarPersonasEnDepartamento(id: number) { return this.api.get<number>(`Departamentos/CountPersonas/${id}`); }
}