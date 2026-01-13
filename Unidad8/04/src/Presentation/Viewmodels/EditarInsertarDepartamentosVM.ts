import { makeAutoObservable } from "mobx";
import { AddDepartamentoUseCase } from "../../Domain/Usecases/Departamentos/AddDepartamentoUseCase";
import { UpdateDepartamentoUseCase } from "../../Domain/Usecases/Departamentos/UpdateDepartamentoUseCase";
import { DepartamentoDTO } from "../../Domain/DTO/DepartamentoDTO";

export class EditarInsertarDepartamentosVM {
  departamento: DepartamentoDTO = {} as any;

  constructor(
    private addDepartamento: AddDepartamentoUseCase,
    private updateDepartamento: UpdateDepartamentoUseCase
  ) {
    makeAutoObservable(this);
  }

  setDepartamento(depto: DepartamentoDTO) {
    this.departamento = depto;
  }

  async guardar() {
    if (this.departamento._id) {
      await this.updateDepartamento.execute(this.departamento as any);
    } else {
      await this.addDepartamento.execute(this.departamento as any);
    }
  }
}
