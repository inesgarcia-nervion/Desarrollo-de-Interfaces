import { IRoomRepository } from '../../interfaces/repositories/IRoomRepository';
import { Room } from '../../entities/Room';
import { ICrearSalaUseCase } from '../../interfaces/usecases/room/ICrearSalaUseCase';

export class CrearSalaUseCase implements ICrearSalaUseCase {
  constructor(private repo: IRoomRepository) {}
  async execute(nombre: string): Promise<Room> {
    return await this.repo.crearSala(nombre);
  }
}

export default CrearSalaUseCase;
