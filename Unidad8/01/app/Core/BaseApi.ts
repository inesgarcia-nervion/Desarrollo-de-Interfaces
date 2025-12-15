import { injectable } from "inversify";

@injectable()
export class BaseApi {
    // Aquí podrías implementar lógica común para las llamadas a APIs,
    // como configuración de headers, manejo de errores, etc.
    // CAMBIO 1: Pon aquí la URL base de tu API de Azure real
    private readonly BASE_URL: string = "https://ines-frhqgndaghcnfpds.italynorth-01.azurewebsites.net";

    public getBaseUrl(endpoint: string): string {
        const url = new URL(endpoint, this.BASE_URL);
        return url.toString();
    }

    public getDefaultHeaders(): HeadersInit {
        return {
            "Content-Type": "application/json",
            // Puedes añadir aqui otros headers (ej. Autorización)
        };
    }
}