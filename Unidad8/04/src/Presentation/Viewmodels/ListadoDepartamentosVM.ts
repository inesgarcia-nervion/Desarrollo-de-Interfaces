import { makeAutoObservable, runInAction } from "mobx";
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
    const raw = await this.getDepartamentos.execute();
    // map Domain Departamento -> DepartamentoDTO expected by the UI
    const mapped = (raw || []).map((d: any) => ({
      _id: d.id ?? d._id ?? 0,
      _nombre: d.nombre ?? d._nombre ?? "",
    }));
    runInAction(() => {
      this.departamentos = mapped;
    });
  }

  seleccionarDepartamento(depto: DepartamentoDTO) {
    if (!depto) {
      this.deptoSeleccionado = null;
      return;
    }

    if (this.deptoSeleccionado && this.deptoSeleccionado._id === depto._id) {
      this.deptoSeleccionado = null;
    } else {
      this.deptoSeleccionado = depto;
    }
  }

  async eliminarDepartamento(id: number) {
    await this.deleteDepartamento.execute(id);
    await this.cargarDepartamentos();
  }
}
