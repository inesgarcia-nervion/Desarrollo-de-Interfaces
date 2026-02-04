import { Room } from '../../../entities/Room';

export interface IObtenerListaSalasUseCase {
  execute(): Promise<Room[]>;
}
