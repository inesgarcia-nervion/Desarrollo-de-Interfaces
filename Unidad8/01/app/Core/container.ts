import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { BaseApi } from "./BaseApi";
import { PersonaRepositoryImp } from "../Data/Repositories/personaRepository";
import { GetPersonasUseCases } from "../Domain/Usecases/GetPersonasUseCase";
import { PersonaListVM } from "../UI/ViewModels/PersonaListVM";

const container = new Container();

// API
container.bind<BaseApi>(TYPES.BaseApi).to(BaseApi).inSingletonScope();

// REPOSITORIO
container.bind<any>(TYPES.IPersonaRepository).to(PersonaRepositoryImp);

// USE CASE
container.bind<any>(TYPES.GetPersonasUseCase).to(GetPersonasUseCases);

// VIEW MODEL
container.bind<PersonaListVM>(TYPES.PersonaListVM).to(PersonaListVM);

export { container };
