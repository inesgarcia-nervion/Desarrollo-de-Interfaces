import { Pokemon } from '../../Entities/Pokemon';

export interface IPokemonUseCase {
  GetPokemon(offset: number, limit: number): Promise<Pokemon[]>;
}