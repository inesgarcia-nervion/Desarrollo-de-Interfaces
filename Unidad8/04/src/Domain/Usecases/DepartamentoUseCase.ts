import { injectable, inject } from "inversify";
import { TYPES } from "../../Core/types";
import { Departamento } from "../Entities/Departamento";
import type { IDepartamentoRepository } from "../Interfaces/Repositories/IDepartamentoRepository";
import type { IDepartamentoUseCase } from "../Interfaces/Usecases/IDepartamentoUseCase";

// Función para mapear la respuesta de la API a la entidad Departamento
function mapApiToDepartamento(item: any): Departamento {
    return new Departamento(
        item.id ?? item._id,
        item.nombre ?? item._nombre
    );
}

@injectable()
export class DepartamentoUseCase implements IDepartamentoUseCase {
    constructor(@inject(TYPES.IDepartamentoRepository) private deptoRepo: IDepartamentoRepository) {}

    async GetListadoDepartamentos() { 
        const data = await this.deptoRepo.GetListadoDepartamentos();
        const rawList = data || [];
        console.log("Departamentos raw:", rawList);
        return rawList.map(mapApiToDepartamento);
    }
    async GetDepartamentoPorId(id: number) { 
        const data = await this.deptoRepo.GetDepartamentoPorId(id);
        return mapApiToDepartamento(data);
    }
    async InsertarDepartamento(d: Departamento) { return this.deptoRepo.InsertarDepartamento(d); }
    async EditarDepartamento(d: Departamento) { return this.deptoRepo.EditarDepartamento(d); }
    async EliminarDepartamento(id: number) { return this.deptoRepo.EliminarDepartamento(id); }
}