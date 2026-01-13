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
        const url = this.getUrl(endpoint);
        const response = await fetch(url, { method: "GET", headers: this.getDefaultHeaders() });
        return response.json();
    }

    public async post<T>(endpoint: string, body: any): Promise<T> {
        const url = this.getUrl(endpoint);
        const response = await fetch(url, { method: "POST", headers: this.getDefaultHeaders(), body: JSON.stringify(body) });
        const text = await response.text();
        return text ? JSON.parse(text) : null as T;
    }

    public async put<T>(endpoint: string, body: any): Promise<T> {
        const url = this.getUrl(endpoint);
        const response = await fetch(url, { method: "PUT", headers: this.getDefaultHeaders(), body: JSON.stringify(body) });
        const text = await response.text();
        return text ? JSON.parse(text) : null as T;
    }

    public async delete<T>(endpoint: string): Promise<T> {
        const url = this.getUrl(endpoint);
        const response = await fetch(url, { method: "DELETE", headers: this.getDefaultHeaders() });
        const text = await response.text();
        return text ? JSON.parse(text) : null as T;
    }
}
