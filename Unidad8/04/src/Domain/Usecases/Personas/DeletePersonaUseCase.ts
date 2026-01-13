import { IPersonaRepository } from "../../Interfaces/Repositories/IPersonaRepository";
import { inject, injectable } from "inversify";

@injectable()
export class DeletePersonaUseCase {
  constructor(@inject("IPersonaRepository") private repo: IPersonaRepository) {}

  async execute(id: number) {
    const today = new Date();
    const day = today.getDay();
    if (day === 0) throw new Error("No se puede eliminar personas los domingos");
    return this.repo.EliminarPersona(id);
  }
}
