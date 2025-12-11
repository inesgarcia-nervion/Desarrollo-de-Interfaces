import { injectable } from "inversify";

@injectable()
export class BaseApi {
    // Aquí podrías implementar lógica común para las llamadas a APIs,
    // como configuración de headers, manejo de errores, etc.
    private readonly BASE_URL: string = "https://api.ejemplo.com";

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