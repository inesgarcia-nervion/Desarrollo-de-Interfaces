import { injectable } from "inversify";

@injectable()
export class BaseApi {
    // Aquí podrías implementar lógica común para las llamadas a APIs,
    // como configuración de headers, manejo de errores, etc.
    // CAMBIO 1: Pon aquí la URL base de tu API de Azure real
    private readonly BASE_URL: string = "https://ines-frhqgndaghcnfpds.italynorth-01.azurewebsites.net/api/";

    public getUrl(endpoint: string): string {
        // Si endpoint es 'personas', el resultado será .../api/personas
        return `${this.BASE_URL}${endpoint}`;
    }

    public getDefaultHeaders(): HeadersInit {
        return {
            "Content-Type": "application/json",
        };
    }
}