import { Room } from '../../../entities/Room';

export interface ICrearSalaUseCase {
  execute(nombre: string): Promise<Room>;
}
