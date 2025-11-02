import { injectable } from "inversify";
import { IPersonasRepository } from "../../domain/interfaces/repositories/IPersonasRepository";
import { Persona } from "../../domain/entities/Persona";

@injectable()
export class PersonasRepository implements IPersonasRepository {
    getListadoCompletoPersonas(): Persona[] {
        return [
            new Persona(1, "Juan", "Pérez", new Date("2000-05-15")),
            new Persona(2, "María", "Gómez", new Date("1995-08-22")),
            new Persona(3, "Carlos", "López", new Date("1992-12-03")),
            new Persona(4, "Ana", "Martínez", new Date("1988-01-30")),
            new Persona(5, "Luis", "Rodríguez", new Date("1990-03-05")),
            new Persona(6, "Sofía", "Hernández", new Date("2003-09-10")),
            new Persona(7, "Miguel", "Fernández", new Date("1998-07-19")),
        ];
    }
}