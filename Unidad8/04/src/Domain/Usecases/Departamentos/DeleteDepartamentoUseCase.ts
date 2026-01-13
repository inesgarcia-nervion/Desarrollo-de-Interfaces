import { IDepartamentoRepository } from "../../Interfaces/Repositories/IDepartamentoRepository";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteDepartamentoUseCase {
  constructor(@inject("IDepartamentoRepository") private repo: IDepartamentoRepository) {}

  async execute(id: number) {
    return this.repo.EliminarDepartamento(id);
  }
}
