import { IPokemonRepository } from '../../Domain/Interfaces/Repositories/IPokemonRepository';
import { Pokemon } from '../../Domain/Entities/Pokemon';

interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResult[];
}

interface PokemonResult {
  name: string;
  url: string;
}

export class PokemonRepository implements IPokemonRepository {
  private readonly BASE_URL: string = 'https://pokeapi.co/api/v2/pokemon';

  async GetAllPokemon(offset: number, limit: number): Promise<Pokemon[]> {
    try {
      const url = `${this.BASE_URL}?limit=${limit}&offset=${offset}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: PokemonApiResponse = await response.json();
      
      if (!data.results) {
        return [];
      }

      return data.results.map(result => new Pokemon(result.name, result.url));
    } catch (error) {
      throw new Error(`Error al obtener pokémon: ${(error as Error).message}`);
    }
  }
}