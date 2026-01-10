import { injectable, inject } from "inversify";
import { TYPES } from "../../Core/types";
import { Departamento } from "../Entities/Departamento";
import type { IDepartamentoRepository } from "../Interfaces/Repositories/IDepartamentoRepository";
import type { IDepartamentoUseCase } from "../Interfaces/Usecases/IDepartamentoUseCase";

@injectable()
export class DepartamentoUseCase implements IDepartamentoUseCase {
    constructor(@inject(TYPES.IDepartamentoRepository) private deptoRepo: IDepartamentoRepository) {}

    async GetListadoDepartamentos() { return this.deptoRepo.GetListadoDepartamentos(); }
    async GetDepartamentoPorId(id: number) { return this.deptoRepo.GetDepartamentoPorId(id); }
    async InsertarDepartamento(d: Departamento) { return this.deptoRepo.InsertarDepartamento(d); }
    async EditarDepartamento(d: Departamento) { return this.deptoRepo.EditarDepartamento(d); }
    async EliminarDepartamento(id: number) { return this.deptoRepo.EliminarDepartamento(id); }
}