export class Persona {
    constructor(
        private _id: number,
        private _nombre: string,
        private _apellidos: string,
        private _fechaNacimiento: Date
    ) {}

    get id(): number { return this._id; }
    get nombre(): string { return this._nombre; }
    get apellidos(): string { return this._apellidos; }
    get fechaNacimiento(): Date { return this._fechaNacimiento; }
}