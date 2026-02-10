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

  // ✅ Llamar esto UNA vez al montar RoomListScreen
  // Se suscribe a actualizaciones en tiempo real Y pide la lista inicial
  iniciarEscucha() {
    // Suscripción continua: cada vez que el servidor mande ListaSalas, actualizamos
    this.signalR.recibirListaSalas((salas) => {
      // ✅ Invertir para que las salas nuevas (creadas últimas) aparezcan primero
      this.salas = [...salas].reverse();
      this.estaCargando = false;
    });

    // Pedimos la lista inicial
    this.estaCargando = true;
    this.signalR.obtenerSalas().catch(() => {
      this.error = 'Error al cargar las salas';
      this.estaCargando = false;
    });
  }

  // Sigue disponible para refrescar manualmente si hace falta
  async cargarSalas() {
    this.estaCargando = true;
    this.error = null;
    try {
      await this.signalR.obtenerSalas();
      // La respuesta llegará por el evento ListaSalas -> iniciarEscucha la maneja
    } catch (e) {
      this.error = 'Error al cargar las salas';
      this.estaCargando = false;
      // error logged elsewhere
    }
  }

  async crearSala(nombre: string) {
    try {
      const sala = await this.crearSalaUC.execute(nombre);
      // El servidor mandará ListaSalas a todos automáticamente
      return sala;
    } catch (e) {
      this.error = 'Error al crear la sala';
      // error logged elsewhere
      throw e;
    }
  }

  async unirseASala(idSala: string) {
    try {
      await this.unirseASalaUC.execute(idSala);
    } catch (e) {
      this.error = 'Error al unirse a la sala';
      // error logged elsewhere
    }
  }
}

export default RoomListViewModel;