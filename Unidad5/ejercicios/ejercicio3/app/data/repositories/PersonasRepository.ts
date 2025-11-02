import { IPersonasRepository } from "../../domain/interfaces/IPersonasRepository";
import {Persona} from "../../domain/entities/Persona";


export class PersonasRepository implements IPersonasRepository{
    getListadoCompletoPersonas(): Persona[] {  
        return [
            new Persona(1, 'Javier', 'Cruz Romero', new Date('1990-05-15')),
            new Persona(2, 'Carlos', 'Martínez López', new Date('1985-10-30')),
            new Persona(3, 'Ana', 'Rodríguez Pérez', new Date('1992-07-22')),
            new Persona(4, 'Miguel', 'Sánchez Ruiz', new Date('1988-12-11')),
            new Persona(5, 'Laura', 'Torres Díaz', new Date('1995-03-05')),
            new Persona(6, 'David', 'Moreno García', new Date('1991-08-19')),
            new Persona(7, 'Sofía', 'Vega Jiménez', new Date('1987-11-23')),
        ];
    }

}