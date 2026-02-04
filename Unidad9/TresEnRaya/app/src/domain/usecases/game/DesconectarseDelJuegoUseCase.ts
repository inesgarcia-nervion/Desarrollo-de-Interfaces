import { IGameRepository } from '../../interfaces/repositories/IGameRepository';

export class DesconectarseDelJuegoUseCase {
  constructor(private repo: IGameRepository) {}
  async execute(): Promise<void> {
    await this.repo.desconectarse();
  }
}

export default DesconectarseDelJuegoUseCase;
