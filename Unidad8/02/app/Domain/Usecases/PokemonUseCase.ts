import { IPokemonUseCase } from '../Interfaces/Usecases/IPokemonUseCase';
import { IPokemonRepository } from '../Interfaces/Repositories/IPokemonRepository';
import { Pokemon } from '../Entities/Pokemon';

export class PokemonUseCase implements IPokemonUseCase {
  private _repository: IPokemonRepository;

  constructor(repository: IPokemonRepository) {
    this._repository = repository;
  }

  async GetPokemon(offset: number, limit: number): Promise<Pokemon[]> {
    return await this._repository.GetAllPokemon(offset, limit);
  }
}