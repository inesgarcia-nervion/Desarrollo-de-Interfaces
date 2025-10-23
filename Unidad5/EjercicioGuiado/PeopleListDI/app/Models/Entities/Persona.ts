export class Persona {
  // Propiedades privadas
  private _id: number;
  private _nombre: string;
  private _apellidos: string;

  // Constructor
  constructor(id: number, nombre: string, apellidos: string) {
    this._id = id;
    this._nombre = nombre;
    this._apellidos = apellidos;
  }

  // Getter y Setter para id
  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  // Getter y Setter para nombre
  public get nombre(): string {
    return this._nombre;
  }

  public set nombre(value: string) {
    this._nombre = value;
  }

  // Getter y Setter para apellidos
  public get apellidos(): string {
    return this._apellidos;
  }

  public set apellidos(value: string) {
    this._apellidos = value;
  }
}
