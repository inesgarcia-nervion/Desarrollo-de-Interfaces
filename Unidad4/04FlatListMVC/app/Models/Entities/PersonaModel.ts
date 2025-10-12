export class Personas{

    private _id: number;
    private _nombre: string;
    private _apellidos: string;


    constructor(id: number, nombre:string, apellidos:string) {
        this._id = id;
        this._nombre = nombre;
        this._apellidos = apellidos;
    }


    //#region Getters y Setters
    public getId(): number{
        return this._id
    }

    public getNombre(): string{
        return this._nombre
    }

    public setNombre(nombre: string) {
        this._nombre = nombre
    }

    public getApellidos(): string{
        return this._apellidos
    }

    public setApellidos(apellidos: string) {
        this._apellidos = apellidos
    }

    //#endregion

}