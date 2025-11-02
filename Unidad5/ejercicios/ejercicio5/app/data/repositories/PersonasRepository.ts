import {IPersonasRepository} from "../../domain/interfaces/IPersonasRepository";
import {Persona} from "../../domain/entities/Persona";

export class PersonasRepository implements IPersonasRepository{
    getListadoCompletoPersonas(): Persona[] {
        return [
            new Persona('Javier', 'Cruz Romero', true),
            new Persona('Carlos', 'Martínez López', false),
            new Persona('Ana', 'Rodríguez Pérez', true),
            new Persona('Miguel', 'Sánchez Ruiz', false),
            new Persona('Laura', 'Torres Díaz', true),
            new Persona('David', 'Moreno García', false),
            new Persona('Sofía', 'Vega Jiménez', true),
        ]
    }

}