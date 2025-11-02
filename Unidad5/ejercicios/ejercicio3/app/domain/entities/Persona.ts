export class Persona {

    //#region Propiedades privadas
    private _id: number;
    private _nombre: string;
    private _apellidos: string; 
    private _fechaNacimiento: Date;
    //#endregion


    //#region Constructor
    constructor(id: number, nombre: string, apellidos: string, fechaNacimiento: Date) {
        this._id = id;
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._fechaNacimiento = fechaNacimiento;
    }   
    //#endregion


    //#region Getters y Setters
    public get id(): number {
        return this._id;
    }

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

    public get fechaNacimiento(): Date {
        return this._fechaNacimiento;
    }

    public set fechaNacimiento(value: Date) {
        this._fechaNacimiento = value;
    }
    //#endregion

}