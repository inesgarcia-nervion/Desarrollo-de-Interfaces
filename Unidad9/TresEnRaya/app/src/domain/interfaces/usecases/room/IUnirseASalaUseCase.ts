import { Room } from '../../../entities/Room';

export interface IUnirseASalaUseCase {
  execute(idSala: string): Promise<Room>;
}
