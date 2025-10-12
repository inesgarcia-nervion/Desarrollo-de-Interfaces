import { PersonaModel } from "../Models/Entities/PersonaModel"; 
import { RepositoryPersona } from "../Models/Data/RepositoryPersona";

export class IndexVM {
    private personas: PersonaModel[];                          
    private personaSeleccionada: PersonaModel;


    constructor() {
        //Inicializa la lista de personas desde el modelo
        this.personas = RepositoryPersona.getPersonas();
        this.personaSeleccionada = this.getPersonaSeleccionada();
    }


    //Devuelve la lista completa de personas
    public getPersonas(): PersonaModel[] {   // Arrays de personas
        return this.personas;
    }

    public getPersonaSeleccionada(): PersonaModel {
        return this.personaSeleccionada
    }

    public setPersonaSeleccionada(persona: PersonaModel) {
        this.personaSeleccionada = persona;
    }

    public getPersonaId(id: number): PersonaModel | undefined{       // Si encuentra una persona con el id buscado, retorna objeto PersonaModel. Si no encuentra, retorna undefined.
        return this.personas.find(persona => persona.getId() === id);
    }   // Para coger el id, entramos al repository y buscamos el id de cada persona

}

export default IndexVM;