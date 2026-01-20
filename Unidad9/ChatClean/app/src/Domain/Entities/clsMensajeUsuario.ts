export class clsMensajeUsuario {
	id: string;
	nombre: string;
	mensaje: string;
	fecha: Date;
	color?: string;

	constructor(nombre: string, mensaje: string, id?: string, fecha?: Date, color?: string) {
		this.id = id ?? Math.random().toString(36).substring(2, 12);
		this.nombre = nombre;
		this.mensaje = mensaje;
		this.fecha = fecha ?? new Date();
		this.color = color;
	}
}
