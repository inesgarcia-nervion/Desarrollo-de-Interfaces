import { makeObservable, observable, action, runInAction } from 'mobx';
import { IPokemonUseCase } from '../../Domain/Interfaces/Usecases/IPokemonUseCase';
import { Pokemon } from '../../Domain/Entities/Pokemon';

export class PokemonViewModel {
  public PokemonList: Pokemon[] = [];
  public IsLoading: boolean = false;
  public ErrorMessage: string = '';
  private _currentOffset: number = 0;
  private _limit: number = 20;
  private _pokemonUseCase: IPokemonUseCase;

  constructor(pokemonUseCase: IPokemonUseCase) {
    this._pokemonUseCase = pokemonUseCase;
    
    makeObservable(this, {
      PokemonList: observable,
      IsLoading: observable,
      ErrorMessage: observable,
      LoadNextPage: action
    });
  }

  CurrentOffset(): number {
    return this._currentOffset;
  }

  Limit(): number {
    return this._limit;
  }

  async LoadNextPage(): Promise<void> {
    if (this.IsLoading) return;

    this.IsLoading = true;
    this.ErrorMessage = '';

    try {
      const pokemon = await this._pokemonUseCase.GetPokemon(this._currentOffset, this._limit);
      
      runInAction(() => {
        this.PokemonList = pokemon;
        this._currentOffset += this._limit;
        this.IsLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.ErrorMessage = `Error: ${(error as Error).message}`;
        this.IsLoading = false;
      });
    }
  }
}