import { injectable } from "inversify";
import { IPersonasRepository } from "../../domain/interfaces/repositories/IPersonasRepository";
import { Persona } from "../../domain/entities/Persona";


@injectable()
export class PersonasRepositoryEmpty implements IPersonasRepository{
    getListadoCompletoPersonas(): Persona[] {
        

        return [
            
        ];
    }


    getPersonaPorId(id: number): Persona | undefined {   //Estamos obligados a implementar este método (caso de uso adicional)
        return this.getListadoCompletoPersonas().find(persona => persona.id === id);
    }      

}
