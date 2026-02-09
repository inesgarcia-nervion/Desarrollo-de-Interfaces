import { IRoomRepository } from '../../domain/interfaces/repositories/IRoomRepository';
import { Room } from '../../domain/entities/Room';
import { SignalRConnection } from '../datasources/SignalRConnection';

export class RoomRepository implements IRoomRepository {
  constructor(private signalR: SignalRConnection) {}

  async obtenerSalas(): Promise<Room[]> {
    return new Promise(resolve => {
      this.signalR.recibirListaSalas(resolve);
      this.signalR.obtenerSalas();
    });
  }

  async crearSala(nombre: string): Promise<Room> {
    return new Promise(resolve => {
      this.signalR.crearSalaCallback((id, nombreSala) => {
        resolve({
          id,
          nombre: nombreSala,
          jugadoresActuales: 1,
          jugadoresMaximos: 2,
          estaLlena: false
        });
      });

      this.signalR.crearSala(nombre);
    });
  }

  async unirseASala(idSala: string): Promise<Room> {
    return new Promise(resolve => {
      this.signalR.asignarJugador((simbolo, esperando) => {
        resolve({
          id: idSala,
          nombre: '',
          jugadoresActuales: esperando ? 1 : 2,
          jugadoresMaximos: 2,
          estaLlena: !esperando
        });
      });

      this.signalR.unirseASala(idSala);
    });
  }

  async salirDeSala(): Promise<void> {
    await this.signalR.salirDeSala();
  }
}
