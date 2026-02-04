import { IGameRepository } from '../../interfaces/repositories/IGameRepository';

export class EscucharEventosDelJuegoUseCase {
  constructor(private repo: IGameRepository) {}
  execute(): void {
    this.repo.escucharEventos();
  }
}

export default EscucharEventosDelJuegoUseCase;
