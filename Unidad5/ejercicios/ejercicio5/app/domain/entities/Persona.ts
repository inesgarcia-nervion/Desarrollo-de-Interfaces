export class Persona{

    //#region Propiedades privadas
    private _nombre: string;
    private _apellidos: string; 
    private _checked: boolean;
    //#endregion


    //#region Constructor
    constructor(nombre: string, apellidos: string, checked: boolean = false) {
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._checked = checked;
    }
    //#endregion


    //#region Getters y Setters
    public get nombre(): string{
        return this._nombre;
    }   
    public set nombre(value: string) {
        this._nombre = value;
    }
    public get apellidos(): string {
        return this._apellidos;
    }   
    public set apellidos(value: string) {
        this._apellidos = value;
    }   
    public get checked(): boolean {
        return this._checked;
    }       
    //#endregion
    
}