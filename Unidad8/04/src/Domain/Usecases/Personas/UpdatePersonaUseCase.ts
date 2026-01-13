import { IPersonaRepository } from "../../Interfaces/Repositories/IPersonaRepository";
import { Persona } from "../../Entities/Persona";
import { inject, injectable } from "inversify";

@injectable()
export class UpdatePersonaUseCase {
  constructor(@inject("IPersonaRepository") private repo: IPersonaRepository) {}

  async execute(persona: Persona) {
    return this.repo.EditarPersona(persona);
  }
}
