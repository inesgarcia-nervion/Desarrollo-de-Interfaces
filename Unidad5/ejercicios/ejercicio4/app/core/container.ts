import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";
import { PersonasRepository } from "../data/repositories/PersonasRepository";
import { PersonasUseCases } from "../domain/usecases/PersonasUseCases";
import { PeopleListVM } from "../presentation/viewmodels/PeopleListVM";
import { IPersonasRepository } from "../domain/interfaces/repositories/IPersonasRepository";
import { IPersonasUseCase } from "../domain/interfaces/repositories/IPersonasUseCase";

const container = new Container();

// Esto es crucial: Bind de la interfaz al repo concreto
container.bind<IPersonasRepository>(TYPES.IPersonasRepository).to(PersonasRepository);
container.bind<IPersonasUseCase>(TYPES.IPersonasUseCase).to(PersonasUseCases);
container.bind<PeopleListVM>(TYPES.PeopleListVM).to(PeopleListVM);

export { container };
