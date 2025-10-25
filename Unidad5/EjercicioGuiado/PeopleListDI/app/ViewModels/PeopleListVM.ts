// Es el “puente” entre la vista (View) y los datos (Repositorio).
// No crea el repositorio directamente; lo recibe por inyección (Inversify se lo pasa).
// De este modo, la vista no depende del repositorio concreto, sino de la abstracción (IRepositoryPersonas).
// ViewModel no genera los datos ni los muestra, solo los organiza.


//La vista (View) es lo que ves en pantalla — botones, texto, listas.
//El ViewModel decide qué mostrar y de dónde sacar los datos.
//El repositorio (Repository) es la “fuente” de los datos (como la base de datos o una API).


import { Persona } from "@/app/Models/Entities/Persona";
import { inject } from "inversify";
import { TYPES } from "../Core/types";
import { IRepositoryPersonas } from "../Models/Data/personasRepository";



export class PeopleListVM {

    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;


    constructor(@inject(TYPES.IRepositoryPersonas) private RepositoryPersonas: IRepositoryPersonas) {
        this._personaSeleccionada = new Persona(0, '', '');
        this._personasList = this.RepositoryPersonas.getListadoCompletoPersonas();
    }


    public get personasList(): Persona[] {
        return this._personasList;
    }


    public get personaSeleccionada(): Persona {
        return this._personaSeleccionada;
    }


    public set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value;
    
    }




}
