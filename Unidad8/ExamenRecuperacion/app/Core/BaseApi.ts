// Core/BaseApi.ts
import { injectable } from "inversify";

@injectable()
export class BaseApi {
    private readonly BASE_URL: string = "https://ines-frhqgndaghcnfpds.italynorth-01.azurewebsites.net/api/";

    public getUrl(endpoint: string): string {
        return `${this.BASE_URL}${endpoint}`;
    }

    public getDefaultHeaders(): HeadersInit {
        return {
            "Content-Type": "application/json",
        };
    }

    // Nuevo método GET que devuelve datos parseados a JSON
    public async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(this.getUrl(endpoint), {
            method: "GET",
            headers: this.getDefaultHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Error en GET ${endpoint}: ${response.status}`);
        }

        return response.json() as Promise<T>;
    }
}
