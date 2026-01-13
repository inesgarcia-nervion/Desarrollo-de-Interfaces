import { Departamento } from "../../../Entities/Departamento";

export interface AddDepartamento {
  execute(depto: Departamento): Promise<number>;
}
