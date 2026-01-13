import { IPersonaRepository } from "../../Interfaces/Repositories/IPersonaRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetPersonasUseCase {
  constructor(@inject("IPersonaRepository") private repo: IPersonaRepository) {}

  async execute() {
    let personas = await this.repo.GetListadoPersonas();
    const today = new Date();
    const day = today.getDay(); // 0=Domingo, 5=Viernes, 6=Sábado

    if (day === 5 || day === 6) {
      personas = personas.filter(p => p._edad > 18);
    }

    return personas;
  }
}
