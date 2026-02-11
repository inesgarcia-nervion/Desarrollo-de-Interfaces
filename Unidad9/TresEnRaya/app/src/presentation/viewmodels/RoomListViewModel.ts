import { makeAutoObservable } from 'mobx';
import { Room } from '../../domain/entities/Room';
import { IObtenerListaSalasUseCase } from '../../domain/interfaces/usecases/room/IObtenerListaSalasUseCase';
import { ICrearSalaUseCase } from '../../domain/interfaces/usecases/room/ICrearSalaUseCase';
import { IUnirseASalaUseCase } from '../../domain/interfaces/usecases/room/IUnirseASalaUseCase';
import { SignalRConnection } from '../../data/datasources/SignalRConnection';

export class RoomListViewModel {
  salas: Room[] = [];
  estaCargando: boolean = false;
  error: string | null = null;

  constructor(
    private obtenerSalasUC: IObtenerListaSalasUseCase,
    private crearSalaUC: ICrearSalaUseCase,
    private unirseASalaUC: IUnirseASalaUseCase,
    private signalR: SignalRConnection
  ) {
    makeAutoObservable(this);
  }

  iniciarEscucha() {
    this.signalR.recibirListaSalas((salas) => {
      this.salas = [...salas].reverse();
      this.estaCargando = false;
    });

    this.estaCargando = true;
    this.signalR.obtenerSalas().catch(() => {
      this.error = 'Error al cargar las salas';
      this.estaCargando = false;
    });
  }

  async cargarSalas() {
    this.estaCargando = true;
    this.error = null;
    try {
      await this.signalR.obtenerSalas();
    } catch (e) {
      this.error = 'Error al cargar las salas';
      this.estaCargando = false;
    }
  }

  async crearSala(nombre: string) {
    try {
      const sala = await this.crearSalaUC.execute(nombre);
      return sala;
    } catch (e) {
      this.error = 'Error al crear la sala';
      throw e;
    }
  }

  async unirseASala(idSala: string) {
    try {
      await this.unirseASalaUC.execute(idSala);
    } catch (e) {
      this.error = 'Error al unirse a la sala';
    }
  }
}

export default RoomListViewModel;