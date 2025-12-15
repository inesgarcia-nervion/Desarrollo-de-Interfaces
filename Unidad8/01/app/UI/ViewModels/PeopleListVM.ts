import { makeAutoObservable } from "mobx";
import { Persona } from "../../Domain/Entities/Persona";
import { inject, injectable } from "inversify";
import { TYPES } from "../../Core/types";
import { IPersonasRepositoryUseCase } from "../../Domain/Interfaces/Usecases/IPersonasRepositoryUseCase";

@injectable()
export class PeopleListVM {

    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;
    private isLoading: boolean = false; // Nuevo: para mostrar un spinner

    constructor(
        @inject(TYPES.IPersonasRepositoryUseCase)
        private personasUseCases: IPersonasRepositoryUseCase
    ) {
        this._personaSeleccionada = new Persona(0, "Selecciona", "una persona");

        this._personasList = this.personasUseCases.getListadoCompleto();

        makeAutoObservable(this);
    }

    get personasList(): Persona[] {
        return this._personasList;
    }

    get personaSeleccionada(): Persona {
        return this._personaSeleccionada;
    }

    set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value;
    }

    // Simular carga de datos asincrónica (Nuevo)
    async cargarPersonas() {
        this._personasList = await this.personasUseCases.getListadoCompleto();
    }
}
