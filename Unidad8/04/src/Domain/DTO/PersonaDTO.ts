export interface PersonaDTO {
  _id: number;
  _nombre: string;
  _apellidos: string;
  _edad: number;
  _fechaNacimiento: string;
  _direccion: string;
  _telefono: string;
  _foto?: string | null;
  _idDepartamento: number;
  nombreDepartamento: string;
}
