//Crea el contenedor de dependencias (una especie de “fábrica inteligente”).
//Define qué clase concreta se usará cuando alguien pida una interfaz.

import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";

  //Se importan aquí todas las clases creadas en el data/repositories
import { PersonasRepository } from "../data/repositories/personasRepository";
import { PersonasRepositoryEmpty } from "../data/repositories/PersonasRepositoryEmpty";
import { PersonasRepository100 } from "../data/repositories/PersonasRepository100";

import { IPersonasRepositoryUseCase } from "../domain/interfaces/repositories/IPersonasRepositoryUseCase";
import { PersonasUseCases } from "../domain/usecases/PersonasUseCases";
import { PeopleListVM } from "../presentation/viewmodels/PeopleListVM";
import { IPersonasRepository } from "../domain/interfaces/repositories/IPersonasRepository";


const container = new Container();


// Vinculamos la interfaz con su implementación concreta
container.bind<IPersonasRepository>(TYPES.IPersonasRepository).to(PersonasRepository)  //En esta línea cambias a las clases que quieren que aparezcan

// Use case 
container.bind<IPersonasRepositoryUseCase>(TYPES.IPersonasRepositoryUseCase).to(PersonasUseCases);

// ViewModel
container.bind<PeopleListVM>(TYPES.PeopleListVM).to(PeopleListVM);


export { container };
