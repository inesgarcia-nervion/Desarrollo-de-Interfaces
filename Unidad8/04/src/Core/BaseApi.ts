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
        console.log("GET request to:", url);
        try {
            const response = await fetch(url, { method: "GET", headers: this.getDefaultHeaders() });
            console.log("Response status:", response.status);
            const data = await response.json();
            console.log("Response data:", data);
            return data;
        } catch (error) {
            console.error("GET error:", error);
            throw error;
        }
    }

    public async post<T>(endpoint: string, body: any): Promise<T> {
        const url = this.getUrl(endpoint);
        console.log("POST request to:", url);
        console.log("POST body:", body);
        const response = await fetch(url, { 
            method: "POST", 
            headers: this.getDefaultHeaders(), 
            body: JSON.stringify(body) 
        });
        console.log("Response status:", response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error("POST error response:", errorText);
            throw new Error(`POST error: ${response.status} ${errorText}`);
        }
        
        const text = await response.text();
        console.log("Response text:", text);
        if (!text) return null as T;
        return JSON.parse(text);
    }

    public async put<T>(endpoint: string, body: any): Promise<T> {
        const url = this.getUrl(endpoint);
        console.log("PUT request to:", url);
        console.log("PUT body:", body);
        const response = await fetch(url, { 
            method: "PUT", 
            headers: this.getDefaultHeaders(), 
            body: JSON.stringify(body) 
        });
        console.log("Response status:", response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error("PUT error response:", errorText);
            throw new Error(`PUT error: ${response.status} ${errorText}`);
        }
        
        const text = await response.text();
        console.log("Response text:", text);
        if (!text) return null as T;
        return JSON.parse(text);
    }

    public async delete<T>(endpoint: string): Promise<T> {
        const url = this.getUrl(endpoint);
        console.log("DELETE request to:", url);
        const response = await fetch(url, { 
            method: "DELETE", 
            headers: this.getDefaultHeaders() 
        });
        console.log("Response status:", response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error("DELETE error response:", errorText);
            throw new Error(`DELETE error: ${response.status} ${errorText}`);
        }
        
        const text = await response.text();
        console.log("Response text:", text);
        if (!text) return null as T;
        return JSON.parse(text);
    }
}