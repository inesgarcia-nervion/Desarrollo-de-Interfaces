import { Room } from '../../domain/entities/Room';
import { IObtenerListaSalasUseCase } from '../../domain/interfaces/usecases/room/IObtenerListaSalasUseCase';
import { ICrearSalaUseCase } from '../../domain/interfaces/usecases/room/ICrearSalaUseCase';
import { IUnirseASalaUseCase } from '../../domain/interfaces/usecases/room/IUnirseASalaUseCase';

export class RoomListViewModel {
  salas: Room[] = [];
  estaCargando: boolean = false;

  constructor(
    private obtenerSalasUC: IObtenerListaSalasUseCase,
    private crearSalaUC: ICrearSalaUseCase,
    private unirseASalaUC: IUnirseASalaUseCase
  ) {}

  async cargarSalas() {
    this.estaCargando = true;
    this.salas = await this.obtenerSalasUC.execute();
    this.estaCargando = false;
  }

  async crearSala(nombre: string) {
    await this.crearSalaUC.execute(nombre);
    await this.cargarSalas();
  }

  async unirseASala(idSala: string) {
    await this.unirseASalaUC.execute(idSala);
    await this.cargarSalas();
  }
}

export default RoomListViewModel;
