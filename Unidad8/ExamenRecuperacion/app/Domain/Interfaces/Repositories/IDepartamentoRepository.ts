import { Departamento } from "../../Entities/Departamento";

export interface IDepartamentoRepository {
    GetListadoDepartamentosRepository(): Promise<Departamento[]>;
    GetDepartamentoPorId(id: number): Promise<Departamento>;
}
