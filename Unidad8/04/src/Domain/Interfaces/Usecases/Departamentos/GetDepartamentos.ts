import { Departamento } from "../../../Entities/Departamento";

export interface GetDepartamentos {
  execute(): Promise<Departamento[]>;
}
