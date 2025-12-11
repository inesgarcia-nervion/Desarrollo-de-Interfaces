import { injectable } from "inversify";
import { IPersonasRepository } from "@/app/Domain/Interfaces/Repositories/IPersonasRepository";
import { Persona } from "../../Domain/Entities/Persona";
import { BaseApi } from "../../Core/BaseApi";
import { TYPES } from "../../Core/types";


// Tipo de dato esperado de la API
type PersonaDto = Persona;

@injectable()
export class personasRepository implements IPersonasRepository {
    private api: BaseApi;

    constructor(@inject(TYPES.BaseApi) api: BaseApi) {
        this.api = api;
    }

    async getPersonas(): Promise<Persona[]> {
        const url = this.api.getUrl('personas'); // Endpoint: /api/personas

        try{
            const response = await fetch(url, {
                method: 'GET',
                headers: this.api.getDefaultHeaders(),
            });

            // 1. Manejo de errores HTTP
            if (!response.ok) {
                // Lanza un error con el estado HTTP (ej: 404, 500)
                throw new Error('Fallo en la API: ${response.status} ${response.statusText}');
            }

            // 2. Extracción de datos
            const data: PersonaDto[] = await response. json();

            // Mapeo (si fuera necesario, aqui seria de DTO a Entity)
            const personas: Persona[] = data;

            return personas;
        } catch (error) {
            // Este catch maneja errores de red o los errores lanzados arriba
            let errorMessage = "Fallo al conectar con la API de Azure.";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            console.error("Error al obtener personas:", error);
            throw new Error(errorMessage);
        }
    }
}