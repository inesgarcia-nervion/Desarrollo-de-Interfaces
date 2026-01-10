import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { BaseApi } from "./BaseApi";
import { PersonaRepository } from "../Data/Repositories/PersonaRepository";
import { DepartamentoRepository } from "../Data/Repositories/DepartamentoRepository";
import { PersonaUseCase } from "../Domain/Usecases/PersonaUseCase";
import { DepartamentoUseCase } from "../Domain/Usecases/DepartamentoUseCase";

const container = new Container();

container.bind<BaseApi>(TYPES.BaseApi).to(BaseApi).inSingletonScope();
container.bind<any>(TYPES.IPersonaRepository).to(PersonaRepository).inSingletonScope();
container.bind<any>(TYPES.IDepartamentoRepository).to(DepartamentoRepository).inSingletonScope();
container.bind<any>(TYPES.IPersonaUseCase).to(PersonaUseCase).inSingletonScope();
container.bind<any>(TYPES.IDepartamentoUseCase).to(DepartamentoUseCase).inSingletonScope();

export { container };