import { IGameRepository } from '../../domain/interfaces/repositories/IGameRepository';
import { SignalRConnection } from '../datasources/SignalRConnection';

export class GameRepository implements IGameRepository {
  constructor(private signalR: SignalRConnection) {}

  async hacerMovimiento(fila: number, columna: number): Promise<void> {
    await this.signalR.hacerMovimiento(fila, columna);
  }

  escucharEventos(): void {
    // Aquí conectas los eventos del juego
    // El ViewModel se suscribirá a ellos
  }

  async desconectarse(): Promise<void> {
    await this.signalR.desconectar();
  }
}
