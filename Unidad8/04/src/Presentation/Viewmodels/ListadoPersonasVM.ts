import { makeAutoObservable } from "mobx";
import { GetPersonasUseCase } from "../../Domain/Usecases/Personas/GetPersonasUseCase";
import { DeletePersonaUseCase } from "../../Domain/Usecases/Personas/DeletePersonaUseCase";
import { PersonaDTO } from "../../Domain/DTO/PersonaDTO";

export class ListadoPersonasVM {
  personas: PersonaDTO[] = [];
  personaSeleccionada: PersonaDTO | null = null;

  constructor(
    private getPersonas: GetPersonasUseCase,
    private deletePersona: DeletePersonaUseCase
  ) {
    makeAutoObservable(this);
  }

  async cargarPersonas() {
    this.personas = await this.getPersonas.execute();
  }

  seleccionarPersona(persona: PersonaDTO) {
    this.personaSeleccionada = persona;
  }

  async eliminarPersona(id: number) {
    await this.deletePersona.execute(id);
    await this.cargarPersonas();
  }
}
