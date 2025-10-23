//Crea el contenedor de dependencias (una especie de “fábrica inteligente”).
//Define qué clase concreta se usará cuando alguien pida una interfaz.


import { Container } from "inversify";
import "reflect-metadata";
import { IRepositoryPersonas, PersonasRepository, PersonasRepositoryEmpty, PersonasRepository100 } from "../Models/Data/personasRepository";        //Se importan aquí todas las clases creadas en el Model/Data
import { TYPES } from "./types";
import { PeopleListVM } from "../ViewModels/PeopleListVM";




const container = new Container();


// Vinculamos la interfaz con su implementación concreta
container.bind<IRepositoryPersonas>(TYPES.IRepositoryPersonas).to(PersonasRepository100);   //En esta línea cambias a las clases que quieren que aparezcan
container.bind<PeopleListVM>(TYPES.IndexVM).to(PeopleListVM);
export { container };
