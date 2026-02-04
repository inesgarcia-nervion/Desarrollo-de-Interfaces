import { IGameRepository } from '../../interfaces/repositories/IGameRepository';

export class ConectarseAlJuegoUseCase {
  constructor(private repo: IGameRepository) {}
  execute(): void {
    this.repo.escucharEventos();
  }
}

export default ConectarseAlJuegoUseCase;
