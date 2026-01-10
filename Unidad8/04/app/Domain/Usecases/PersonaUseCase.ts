import { injectable, inject } from "inversify";
import { TYPES } from "../../Core/types";
import { PersonaMayorDeEdadDTO } from "../DTO/PersonaMayorDeEdadDTO";
import { EliminarPersonaDTO } from "../DTO/EliminarPersonaDTO";
import { Persona } from "../Entities/Persona";
import type { IPersonaRepository } from "../Interfaces/Repositories/IPersonaRepository";
import type { IDepartamentoRepository } from "../Interfaces/Repositories/IDepartamentoRepository";
import type { IPersonaUseCase } from "../Interfaces/Usecases/IPersonaUseCase";

@injectable()
export class PersonaUseCase implements IPersonaUseCase {
    constructor(
        @inject(TYPES.IPersonaRepository) private personaRepo: IPersonaRepository,
        @inject(TYPES.IDepartamentoRepository) private deptoRepo: IDepartamentoRepository
    ) {}

    async getPersonaMayorDeEdadDTO(): Promise<PersonaMayorDeEdadDTO> {
        let personas = await this.personaRepo.GetListadoPersonas();
        const hoy = new Date().getDay(); // 5 = Viernes, 6 = Sábado
        if (hoy === 5 || hoy === 6) {
            personas = personas.filter(p => p._edad > 18);
        }
        return new PersonaMayorDeEdadDTO(personas, hoy);
    }

    async getEliminarPersonaDTO(): Promise<EliminarPersonaDTO> {
        const personas = await this.personaRepo.GetListadoPersonas();
        const hoy = new Date().getDay();
        return new EliminarPersonaDTO(personas, hoy, hoy !== 0); // 0 = Domingo
    }

    async InsertarPersona(p: Persona) { return this.personaRepo.InsertarPersona(p); }
    async EditarPersona(p: Persona) { return this.personaRepo.EditarPersona(p); }
    async EliminarPersona(id: number) {
        if (new Date().getDay() === 0) throw new Error("No permitido eliminar los domingos");
        return this.personaRepo.EliminarPersona(id);
    }
}