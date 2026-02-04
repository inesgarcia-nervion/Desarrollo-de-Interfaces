import { IGameRepository } from '../../domain/interfaces/repositories/IGameRepository';
import { SignalRConnection } from '../datasources/SignalRConnection';

export class GameRepository implements IGameRepository {
  private signalR: SignalRConnection;

  constructor(signalR: SignalRConnection) {
    this.signalR = signalR;
  }

  async hacerMovimiento(fila: number, columna: number): Promise<void> {
    await this.signalR.hacerMovimiento(fila, columna);
  }

  escucharEventos(): void {
    // Aquí deberías suscribirte a los eventos de SignalR
  }

  async desconectarse(): Promise<void> {
    await this.signalR.desconectar();
  }
}
