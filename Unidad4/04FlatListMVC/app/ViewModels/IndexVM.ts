import { Personas } from "../Models/Entities/PersonaModel"; 
import Index from "../Views";
import { RepositoryPersona } from "../Models/Data/RepositoryPersona";


export class IndexVM {
    private personas: Personas[];
    private personaSeleccionada: Personas;



    constructor() {
        //Inicializa la lista de personas desde el modelo
        this.personas = RepositoryPersona.getPersonas();
        this.personaSeleccionada = this.getPersonaSeleccionada();
    }




    //Devuelve la lista completa de personas
    public getPersonas(): Personas[] {   // Arrays de personas
        return this.personas;
    }

    public getPersonaSeleccionada(): Personas {
        return this.personaSeleccionada
    }

    public setPersonaSeleccionada(persona: Personas) {
        this.personaSeleccionada = persona;
    }

    private getPersonaId(id: number): Personas | undefined{
        return this.personas.find(persona => persona.getId() === id);
    }   // Para coger el id, entramos al repository y buscamos el id de cada persona

}

export default IndexVM;