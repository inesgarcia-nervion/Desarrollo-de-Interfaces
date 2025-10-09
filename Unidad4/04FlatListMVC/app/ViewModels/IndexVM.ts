import { Personas } from "../Models/Entities/PersonaModel"; 
import Index from "../Views";

export class IndexVM {
    private personas: Personas[];
    private personaSeleccionada: Personas;

    constructor() {
        //Inicializa la lista de personas desde el modelo
        this.personas = getPersonas();
    }

    //Devuelve la lista completa de personas
    public get Personas: Personas[] {   // Arrays de personas
        return this.personas;
    }

    public get PersonaSeleccionada(): Personas {
        return this.personaSeleccionada
    }

    public set PersonaSeleccionada(persona: Personas) {
        this.personaSeleccionada = persona;
    }

    private getPersonaId(id: string): Personas | undefined{
        return this.personas.find(persona => persona.getId() === id);
    }   // Para coger el id, entramos al repository y buscamos el id de cada persona

}

export default IndexVM;