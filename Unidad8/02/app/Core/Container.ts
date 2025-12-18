import { PokemonRepository } from '../Data/Repositories/PokemonRepository';
import { PokemonUseCase } from '../Domain/Usecases/PokemonUseCase';
import { IPokemonRepository } from '../Domain/Interfaces/Repositories/IPokemonRepository';
import { IPokemonUseCase } from '../Domain/Interfaces/Usecases/IPokemonUseCase';

export class Container {
  private _services: Map<string, any>;

  constructor() {
    this._services = new Map<string, any>();
  }

  RegisterServices(): void {
    // Registrar Repository
    const repository: IPokemonRepository = new PokemonRepository();
    this._services.set('IPokemonRepository', repository);

    // Registrar UseCase
    const useCase: IPokemonUseCase = new PokemonUseCase(repository);
    this._services.set('IPokemonUseCase', useCase);
  }

  Resolve<T>(serviceName: string): T {
    if (this._services.has(serviceName)) {
      return this._services.get(serviceName) as T;
    }
    throw new Error(`Servicio ${serviceName} no registrado`);
  }
}
