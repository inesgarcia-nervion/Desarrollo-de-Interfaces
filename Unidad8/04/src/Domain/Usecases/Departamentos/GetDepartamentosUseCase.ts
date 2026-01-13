import { IDepartamentoRepository } from "../../Interfaces/Repositories/IDepartamentoRepository";
import { inject, injectable } from "inversify";

@injectable()
export class GetDepartamentosUseCase {
  constructor(@inject("IDepartamentoRepository") private repo: IDepartamentoRepository) {}

  async execute() {
    return this.repo.GetListadoDepartamentos();
  }
}
