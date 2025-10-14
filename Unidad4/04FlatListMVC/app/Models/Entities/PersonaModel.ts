export class PersonaModel{

    private _id: number;
    private _nombre: string;
    private _apellidos: string;


    constructor(id: number, nombre:string, apellidos:string) {
        this._id = id;
        this._nombre = nombre;
        this._apellidos = apellidos;
    }


    //#region Getters y Setters
    public get Id(): number{
        return this._id
    }

    public get Nombre(): string{
        return this._nombre
    }

    public set Nombre(nombre: string) {
        this._nombre = nombre
    }

    public get Apellidos(): string{
        return this._apellidos
    }

    public set Apellidos(apellidos: string) {
        this._apellidos = apellidos
    }

    //#endregion

}

