import { Departamento } from "../../../Entities/Departamento";

export interface UpdateDepartamento {
  execute(depto: Departamento): Promise<number>;
}
