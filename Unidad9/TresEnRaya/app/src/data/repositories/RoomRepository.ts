import { IRoomRepository } from '../../domain/interfaces/repositories/IRoomRepository';
import { Room } from '../../domain/entities/Room';
import { SignalRConnection } from '../datasources/SignalRConnection';

export class RoomRepository implements IRoomRepository {
  private signalR: SignalRConnection;

  constructor(signalR: SignalRConnection) {
    this.signalR = signalR;
  }

  async obtenerSalas(): Promise<Room[]> {
    // Aquí deberías usar this.signalR.obtenerSalas() y recibir por callback la lista
    return [];
  }

  async crearSala(nombre: string): Promise<Room> {
    // Aquí deberías usar this.signalR.crearSala(nombre) y recibir por callback la sala creada
    return { id: '', nombre, jugadoresActuales: 1, jugadoresMaximos: 2, estaLlena: false };
  }

  async unirseASala(idSala: string): Promise<Room> {
    // Aquí deberías usar this.signalR.unirseASala(idSala) y recibir por callback la sala unida
    return { id: idSala, nombre: '', jugadoresActuales: 2, jugadoresMaximos: 2, estaLlena: true };
  }

  async salirDeSala(): Promise<void> {
    // Aquí deberías usar this.signalR.salirDeSala()
  }
}
