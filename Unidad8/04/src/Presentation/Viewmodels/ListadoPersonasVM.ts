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
      // compute age from fechaNacimiento if backend doesn't provide edad
      const fecha = p.fechaNacimiento ?? p._fechaNacimiento ?? null;
      let edad = p.edad ?? (p._edad ?? 0);
      if ((!edad || edad === 0) && fecha) {
        try {
          const birth = new Date(fecha);
          const now = new Date();
          let years = now.getFullYear() - birth.getFullYear();
          const m = now.getMonth() - birth.getMonth();
          if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) years--;
          edad = years;
        } catch (e) {
          edad = edad ?? 0;
        }
      }

      return {
        _id: p.id ?? p._id,
        _nombre: p.nombre ?? p._nombre ?? "",
        _apellidos: p.apellido ?? p._apellidos ?? "",
        _edad: edad,
        _fechaNacimiento: fecha ?? "",
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
