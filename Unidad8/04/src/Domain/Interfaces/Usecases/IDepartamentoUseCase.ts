import type { Departamento } from "../../Entities/Departamento";

export interface IDepartamentoUseCase {
    GetListadoDepartamentos(): Promise<Departamento[]>;
    GetDepartamentoPorId(id: number): Promise<Departamento>;
    InsertarDepartamento(departamento: Departamento): Promise<number>;
    EditarDepartamento(departamento: Departamento): Promise<number>;
    EliminarDepartamento(id: number): Promise<number>;
}