// Es el “puente” entre la vista (View) y los datos (Repositorio).
// No crea el repositorio directamente; lo recibe por inyección (Inversify se lo pasa).
// De este modo, la vista no depende del repositorio concreto, sino de la abstracción (IRepositoryPersonas).
// ViewModel no genera los datos ni los muestra, solo los organiza.


//La vista (View) es lo que ves en pantalla — botones, texto, listas.
//El ViewModel decide qué mostrar y de dónde sacar los datos.
//El repositorio (Repository) es la “fuente” de los datos (como la base de datos o una API).


import { inject, injectable } from "inversify";
import { IPersonasRepository } from "../../domain/interfaces/repositories/IPersonasRepository";
import { Persona } from "../../domain/entities/Persona";
import { TYPES } from "../../core/types";


@injectable()
export class PeopleListVM {
    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;


    constructor(@inject(TYPES.IPersonasRepository) private RepositoryPersonas: IPersonasRepository) {
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
