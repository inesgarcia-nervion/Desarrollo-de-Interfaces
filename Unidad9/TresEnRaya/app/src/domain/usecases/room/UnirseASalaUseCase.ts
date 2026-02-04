import { IRoomRepository } from '../../interfaces/repositories/IRoomRepository';
import { Room } from '../../entities/Room';
import { IUnirseASalaUseCase } from '../../interfaces/usecases/room/IUnirseASalaUseCase';

export class UnirseASalaUseCase implements IUnirseASalaUseCase {
  constructor(private repo: IRoomRepository) {}
  async execute(idSala: string): Promise<Room> {
    return await this.repo.unirseASala(idSala);
  }
}

export default UnirseASalaUseCase;
