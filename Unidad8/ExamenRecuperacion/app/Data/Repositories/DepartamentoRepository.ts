// Data/Repositories/DepartamentoRepository.ts
import { IDepartamentoRepository } from "../../Domain/Interfaces/Repositories/IDepartamentoRepository";
import { Departamento } from "../../Domain/Entities/Departamento";
import { BaseApi } from "../../Core/BaseApi";

export class DepartamentoRepository implements IDepartamentoRepository {
    constructor(private baseApi: BaseApi) {}

    async GetListadoDepartamentosRepository(): Promise<Departamento[]> {
        const data = await this.baseApi.get<any[]>("/departamentos");
        return data.filter(d => d.nombre !== "Ejemplo").map(d => new Departamento(d.id, d.nombre, "white")); // Asignar color por defecto
    }

    async GetDepartamentoPorId(id: number): Promise<Departamento> {
        const d = await this.baseApi.get<any>(`/departamentos/${id}`);
        return new Departamento(d.id, d.nombre, "white");
    }
}
