import { injectable } from "inversify";

@injectable()
export class BaseApi {
    private readonly BASE_URL: string = "https://ines-frhqgndaghcnfpds.italynorth-01.azurewebsites.net/api/";

    public getUrl(endpoint: string): string {
        return `${this.BASE_URL}${endpoint}`;
    }

    private getDefaultHeaders(): HeadersInit {
        return { "Content-Type": "application/json" };
    }

    public async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(this.getUrl(endpoint), { method: "GET", headers: this.getDefaultHeaders() });
        return response.json();
    }

    public async post<T>(endpoint: string, body: any): Promise<T> {
        const response = await fetch(this.getUrl(endpoint), { method: "POST", headers: this.getDefaultHeaders(), body: JSON.stringify(body) });
        return response.json();
    }

    public async put<T>(endpoint: string, body: any): Promise<T> {
        const response = await fetch(this.getUrl(endpoint), { method: "PUT", headers: this.getDefaultHeaders(), body: JSON.stringify(body) });
        return response.json();
    }

    public async delete<T>(endpoint: string): Promise<T> {
        const response = await fetch(this.getUrl(endpoint), { method: "DELETE", headers: this.getDefaultHeaders() });
        return response.json();
    }
}