//Crea el contenedor de dependencias (una especie de “fábrica inteligente”).
//Define qué clase concreta se usará cuando alguien pida una interfaz.

import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./types";


import { IPersonasRepository } from "../domain/interfaces/repositories/IPersonasRepository";  

  //Se importan aquí todas las clases creadas en el data/repositories
import { PersonasRepository } from "../data/repositories/PersonasRepository";
import { PersonasRepositoryEmpty } from "../data/repositories/PersonasRepositoryEmpty";
import { PersonasRepository100 } from "../data/repositories/PersonasRepository100";

import { PeopleListVM } from "../presentation/viewmodels/PeopleListVM";




const container = new Container();


// Vinculamos la interfaz con su implementación concreta
container.bind<IPersonasRepository>(TYPES.IPersonasRepository).to(PersonasRepository100);   //En esta línea cambias a las clases que quieren que aparezcan
container.bind<PeopleListVM>(TYPES.PeopleListVM).to(PeopleListVM);
export { container };
