import { makeAutoObservable } from "mobx";
import { GetDepartamentosUseCase } from "../../Domain/Usecases/Departamentos/GetDepartamentosUseCase";
import { DeleteDepartamentoUseCase } from "../../Domain/Usecases/Departamentos/DeleteDepartamentoUseCase";
import { DepartamentoDTO } from "../../Domain/DTO/DepartamentoDTO";

export class ListadoDepartamentosVM {
  departamentos: DepartamentoDTO[] = [];
  deptoSeleccionado: DepartamentoDTO | null = null;

  constructor(
    private getDepartamentos: GetDepartamentosUseCase,
    private deleteDepartamento: DeleteDepartamentoUseCase
  ) {
    makeAutoObservable(this);
  }

  async cargarDepartamentos() {
    this.departamentos = await this.getDepartamentos.execute();
  }

  seleccionarDepartamento(depto: DepartamentoDTO) {
    this.deptoSeleccionado = depto;
  }

  async eliminarDepartamento(id: number) {
    await this.deleteDepartamento.execute(id);
    await this.cargarDepartamentos();
  }
}
