import { Sala } from '../../../core/types';

export interface IRoomRepository {
  obtenerSalas(): Promise<Sala[]>;
  crearSala(nombre: string): Promise<Sala>;
  unirseASala(idSala: string): Promise<Sala>;
  salirDeSala(): Promise<void>;
}
