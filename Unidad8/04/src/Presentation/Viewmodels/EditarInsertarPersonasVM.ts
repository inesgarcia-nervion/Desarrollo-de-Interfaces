import { makeAutoObservable } from "mobx";
import { AddPersonaUseCase } from "../../Domain/Usecases/Personas/AddPersonaUseCase";
import { UpdatePersonaUseCase } from "../../Domain/Usecases/Personas/UpdatePersonaUseCase";
import { GetDepartamentosUseCase } from "../../Domain/Usecases/Departamentos/GetDepartamentosUseCase";
import { PersonaDTO } from "../../Domain/DTO/PersonaDTO";
import { DepartamentoDTO } from "../../Domain/DTO/DepartamentoDTO";

export class EditarInsertarPersonasVM {
  persona: PersonaDTO = {} as any;
  departamentos: DepartamentoDTO[] = [];

  constructor(
    private addPersona: AddPersonaUseCase,
    private updatePersona: UpdatePersonaUseCase,
    private getDepartamentos: GetDepartamentosUseCase
  ) {
    makeAutoObservable(this);
    this.cargarDepartamentos();
  }

  async cargarDepartamentos() {
    this.departamentos = await this.getDepartamentos.execute();
  }

  setPersona(persona: PersonaDTO) {
    this.persona = persona;
  }

  async guardar() {
    if (this.persona._id) {
      await this.updatePersona.execute(this.persona as any);
    } else {
      await this.addPersona.execute(this.persona as any);
    }
  }
}
