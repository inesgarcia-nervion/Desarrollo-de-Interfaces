import { makeAutoObservable, runInAction } from "mobx";
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
    const result: any = await this.getPersonas.execute();
    const mapped = (result || []).map((r: any) => {
      const p = r.persona || r;
      return {
        _id: p.id ?? p._id,
        _nombre: p.nombre ?? p._nombre ?? "",
        _apellidos: p.apellido ?? p._apellidos ?? "",
        _edad: p.edad ?? 0,
        _fechaNacimiento: p.fechaNacimiento ?? p._fechaNacimiento ?? "",
        _direccion: p.direccion ?? p._direccion ?? "",
        _telefono: p.telefono ?? p._telefono ?? "",
        _foto: p.foto ?? p._foto ?? null,
        _idDepartamento: p.idDepartamento ?? p._idDepartamento ?? 0,
        nombreDepartamento: r.nombreDepartamento ?? p.nombreDepartamento ?? ""
      } as any;
    });

    runInAction(() => {
      this.personas = mapped;
    });
  }

  seleccionarPersona(persona: PersonaDTO | null) {
    if (!persona) {
      this.personaSeleccionada = null;
      return;
    }

    if (this.personaSeleccionada && this.personaSeleccionada._id === persona._id) {
      this.personaSeleccionada = null;
    } else {
      this.personaSeleccionada = persona;
    }
  }

  async eliminarPersona(id: number) {
    await this.deletePersona.execute(id);
    await this.cargarPersonas();
    this.personaSeleccionada = null;
  }
}
