import { inject, injectable } from "inversify";
import { IPersonaRepository } from "../../Domain/Interfaces/Repositories/IPersonaRepository";
import { Persona } from "../../Domain/Entities/Persona";
import { BaseApi } from "../../Core/BaseApi";
import { TYPES } from "../../Core/types";


// Tipo de dato esperado de la API
type PersonaDto = Persona;

@injectable()
export class PersonaRepositoryImp implements IPersonaRepository {
    private api: BaseApi;

    constructor(@inject(TYPES.BaseApi) api: BaseApi) {
        this.api = api;
    }

    async getPersonas(): Promise<Persona[]> {
        const url = this.api.getUrl('personas'); 
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: this.api.getDefaultHeaders(),
            });

            if (!response.ok) throw new Error('Error al conectar con Azure');

            const data = await response.json();
            
            // 1. Imprime esto en tu consola para ver los nombres reales de las columnas
            console.log("JSON de Azure:", data);

            // 2. Mapeamos la lista. Aunque Azure traiga 'departamento', lo ignoramos aquí.
            return data.map((p: any) => {
                return new Persona(
                    p.id || p.Id || 0,
                    p.nombre || p.Nombre || "Sin nombre",
                    p.apellidos || p.Apellidos || "Sin apellidos",
                    p.edad || p.Edad || 0
                );
            });

        } catch (error) {
            console.error("Error en el repositorio:", error);
            throw error;
        }
    }
}