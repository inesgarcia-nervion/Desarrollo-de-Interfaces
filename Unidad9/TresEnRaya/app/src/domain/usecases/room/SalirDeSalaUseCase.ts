import { IRoomRepository } from '../../interfaces/repositories/IRoomRepository';
import { ISalirDeSalaUseCase } from '../../interfaces/usecases/room/ISalirDeSalaUseCase';

export class SalirDeSalaUseCase implements ISalirDeSalaUseCase {
  constructor(private repo: IRoomRepository) {}
  async execute(): Promise<void> {
    await this.repo.salirDeSala();
  }
}

export default SalirDeSalaUseCase;
