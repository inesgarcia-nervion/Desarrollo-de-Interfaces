import "reflect-metadata";
import { Container } from "inversify";
import { IPersonaRepository } from "../Domain/Interfaces/Repositories/IPersonaRepository";
import { IDepartamentoRepository } from "../Domain/Interfaces/Repositories/IDepartamentoRepository";
import { PersonaRepository } from "../Data/Repositories/PersonaRepository";
import { DepartamentoRepository } from "../Data/Repositories/DepartamentoRepository";

let instance: Container | undefined;

function createContainer(): Container {
	const c = new Container();
	c.bind<IPersonaRepository>("IPersonaRepository").to(PersonaRepository).inSingletonScope();
	c.bind<IDepartamentoRepository>("IDepartamentoRepository").to(DepartamentoRepository).inSingletonScope();
	return c;
}

export function getContainer(): Container {
	if (!instance) instance = createContainer();
	return instance;
}

// default export for backward compatibility
const container = getContainer();
export { container };
