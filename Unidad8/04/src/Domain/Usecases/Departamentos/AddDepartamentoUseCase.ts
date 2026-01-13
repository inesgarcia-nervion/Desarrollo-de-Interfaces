import { IDepartamentoRepository } from "../../Interfaces/Repositories/IDepartamentoRepository";
import { Departamento } from "../../Entities/Departamento";
import { inject, injectable } from "inversify";

@injectable()
export class AddDepartamentoUseCase {
  constructor(@inject("IDepartamentoRepository") private repo: IDepartamentoRepository) {}

  async execute(depto: Departamento) {
    return this.repo.InsertarDepartamento(depto);
  }
}
