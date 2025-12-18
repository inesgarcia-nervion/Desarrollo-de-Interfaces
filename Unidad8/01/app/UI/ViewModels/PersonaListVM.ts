import { inject, injectable } from "inversify";
import { makeAutoObservable } from "mobx";
// Importamos la entidad y el caso de uso
import { Persona } from "../../Domain/Entities/Persona";
import { GetPersonasUseCases } from "../../Domain/Usecases/GetPersonasUseCase";
import { TYPES } from "../../Core/types";


@injectable()
export class PersonaListVM {

    private _personasList: Persona[] = [];
    private _personaSeleccionada: Persona;
    private _isLoading: boolean = false; // Nuevo: para mostrar un spinner
    private _error: string | null = null;

    // El caso de uso lo manejaremos internamente
    private getPersonasUseCases: GetPersonasUseCases;

    constructor(
        // Inyectamos el Caso de Uso (GetPersonasUseCase)
        @inject(TYPES.GetPersonasUseCase)
        private GetPersonasUseCases: GetPersonasUseCases
    ) {
        this.getPersonasUseCases = this.GetPersonasUseCases;

        // AJUSTA esta inicialización según la clase Persona real
        this._personaSeleccionada = new Persona(0, '', '', 0);

        // -----------------------------------------------------------
        // PASO CLAVE: MobX se encarga de inferir todo automáticamente
        // -----------------------------------------------------------
        makeAutoObservable(this);
    }



    // --- GETTERS (MobX los hace automáticamente valores calculados) ---

    // Este getter es público y devuelve la lista observable
    public get personasList(): Persona[] {
        return this._personasList;
    }

    // Este getter es público y devuelve la persona seleccionada
    public get personaSeleccionada(): Persona {
        return this._personaSeleccionada;
    }

    // Añadimos getters para los estados de la UI
    public get isLoading(): boolean {
        return this._isLoading;
    }

    public get error(): string | null {
        return this._error;
    }


    // --- SETTER (MobX los hace automáticamente una 'action') ---
    public set personaSeleccionada(value: Persona) {
        this._personaSeleccionada = value;
    }

    // --- MÉTODO ASÍNCRONO (MobX lo hace automáticamente una 'action') ---

    // Simular carga de datos asincrónica (Nuevo)
    public async fetchPersonas() {
        this._isLoading = true; // El seteo de esta propiedad es una acción
        this._error = null;
        this._personasList = [];


        try{
            // Llama al Caso de Uso (Dominio) para obtener los datos 
            const data = await this.getPersonasUseCases.execute();

            // MobX actualiza _personasList, notificando a las vistas
            this._personasList = data;
        } catch (e: any){
            this._error = e.message || "Ocurrió un error desconocido al obtener la lista"
            console.error(e);
        } finally {
            this._isLoading = false;
        }
    }
}
