export class Persona {
  constructor(
    public _id: number,
    public _nombre: string,
    public _apellidos: string,
    public _edad: number,
    public _fechaNacimiento: Date,
    public _direccion: string,
    public _telefono: string,
    public _foto: string | null,
    public _idDepartamento: number
  ) {}
}
