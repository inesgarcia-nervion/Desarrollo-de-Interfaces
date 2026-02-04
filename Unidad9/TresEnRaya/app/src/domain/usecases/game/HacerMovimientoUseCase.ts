import { IGameRepository } from '../../interfaces/repositories/IGameRepository';

export class HacerMovimientoUseCase {
  constructor(private repo: IGameRepository) {}
  async execute(fila: number, columna: number): Promise<void> {
    await this.repo.hacerMovimiento(fila, columna);
  }
}

export default HacerMovimientoUseCase;
