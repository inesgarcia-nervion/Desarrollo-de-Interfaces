import { PersonaModel } from "../Models/Entities/PersonaModel"; 
import { RepositoryPersona } from "../Models/Data/RepositoryPersona";

export class IndexVM {
    private personas: PersonaModel[];                          
    private personaSeleccionada: PersonaModel | null = null;


    constructor() {
        //Inicializa la lista de personas desde el modelo
        this.personas = RepositoryPersona.getPersonas();
    }


    //Devuelve la lista completa de personas 
    public get Personas(): PersonaModel[] {   // Arrays de personas
        return this.personas;
    }

    public get PersonaSeleccionada(): PersonaModel | null{
        return this.personaSeleccionada
    }

    public set PersonaSeleccionada(persona: PersonaModel | null){
        this.personaSeleccionada = persona;
        this.alertPersonaSeleccionada();                        //Importante los paréntesis
    }

    private alertPersonaSeleccionada(): void{           //Private para que el usuario no pueda acceder
        if(this.personaSeleccionada){
            alert(`Persona Seleccionada: ${this.personaSeleccionada.Nombre}`);
        }
  
    }
}

export default IndexVM;