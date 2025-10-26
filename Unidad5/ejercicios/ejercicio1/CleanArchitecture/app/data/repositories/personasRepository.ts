import { injectable } from "inversify";
import { IPersonasRepository } from "../../domain/interfaces/repositories/IPersonasRepository";
import { Persona } from "../../domain/entities/Persona";


@injectable()
export class PersonasRepository implements IPersonasRepository{
    getListadoCompletoPersonas(): Persona[] {
        

        return [
            new Persona(1, 'Fernando', 'Galiana Fernández'),
            new Persona(2, 'Carlos', 'Martínez López'),
            new Persona(3, 'Ana', 'Rodríguez Pérez'),
            new Persona(4, 'Miguel', 'Sánchez Ruiz'),
            new Persona(5, 'Laura', 'Torres Díaz'),
            new Persona(6, 'David', 'Moreno García'),
        ];
    }


    getPersonaPorId(id: number): Persona | undefined {   //Estamos obligados a implementar este método (caso de uso adicional)
        return this.getListadoCompletoPersonas().find(persona => persona.id === id);
    }      

}
