import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";

import { PersonasRepository100 } from "../Data/Repositories/personasRepository100";
import { IPersonasRepository } from "../Domain/Interfaces/Repositories/IPersonasRepository";

import { PersonasUseCases } from "../Domain/Usecases/PersonasRepositoryUseCase";
import { IPersonasRepositoryUseCase } from "../Domain/Interfaces/Usecases/IPersonasRepositoryUseCase";

import { PeopleListVM } from "../UI/ViewModels/PeopleListVM";

const container = new Container();

// REPOSITORIO
container.bind<IPersonasRepository>(TYPES.IPersonasRepository).to(PersonasRepository100);

// USE CASE
container.bind<IPersonasRepositoryUseCase>(TYPES.IPersonasRepositoryUseCase).to(PersonasUseCases);

// VIEW MODEL
container.bind<PeopleListVM>(TYPES.PeopleListVM).to(PeopleListVM);

export { container };
