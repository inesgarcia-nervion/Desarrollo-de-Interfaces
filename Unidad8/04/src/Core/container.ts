import "reflect-metadata";
import { Container } from "inversify";
import { IPersonaRepository } from "../Domain/Interfaces/Repositories/IPersonaRepository";
import { IDepartamentoRepository } from "../Domain/Interfaces/Repositories/IDepartamentoRepository";
import { PersonaRepository } from "../Data/Repositories/PersonaRepository";
import { DepartamentoRepository } from "../Data/Repositories/DepartamentoRepository";

const container = new Container();

container.bind<IPersonaRepository>("IPersonaRepository").to(PersonaRepository);
container.bind<IDepartamentoRepository>("IDepartamentoRepository").to(DepartamentoRepository);

export { container };
