import { IObtenerListaSalasUseCase } from '../../interfaces/usecases/room/IObtenerListaSalasUseCase';
import { IRoomRepository } from '../../interfaces/repositories/IRoomRepository';
import { Room } from '../../entities/Room';

export class ObtenerListaSalasUseCase implements IObtenerListaSalasUseCase {
  private readonly repo: IRoomRepository;
  constructor(repo: IRoomRepository) {
    this.repo = repo;
  }
  async execute(): Promise<Room[]> {
    return await this.repo.obtenerSalas();
  }
}

export default ObtenerListaSalasUseCase;
