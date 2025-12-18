import { Pokemon } from '../../Entities/Pokemon';

export interface IPokemonRepository {
  GetAllPokemon(offset: number, limit: number): Promise<Pokemon[]>;
}