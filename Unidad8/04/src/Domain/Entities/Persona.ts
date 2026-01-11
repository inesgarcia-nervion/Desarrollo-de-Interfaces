export class Persona {
    constructor(
        public _id: number,
        public _nombre: string,
        public _apellidos: string,
        public _edad: number,
        public _fechaNacimiento: string,
        public _direccion: string,
        public _telefono: string,
        public _idDepartamento: number,
        public _foto?: string
    ) {}
}