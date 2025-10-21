export class Persona {
    
    private _id: number;
    private _nombre: string;
    private _apellidos: string;

    constructor(_id: number, _nombre:string, _apellidos: string){
        this._id= _id;
        this._nombre = _nombre;
        this._apellidos = _apellidos
    }
    
    get id(): number{
        return this._id;
    }

    get nombre(): string{
        return this._nombre;
    }

    set nombre(value : string){
        this._nombre = value;
    }

    get apellidos(): string{
        return this._apellidos;
    } 

    set apellidos(value : string) {
        this._apellidos = value;
    }


}