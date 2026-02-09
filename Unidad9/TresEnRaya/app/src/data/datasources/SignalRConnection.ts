import * as signalR from '@microsoft/signalr';
import { Room } from '../../domain/entities/Room';

export class SignalRConnection {
  private conexion: signalR.HubConnection | null = null;
  private urlServidor: string;

  constructor(urlServidor: string) {
    this.urlServidor = urlServidor;
  }

  async conectar(): Promise<void> {
    this.conexion = new signalR.HubConnectionBuilder()
      .withUrl(this.urlServidor)
      .withAutomaticReconnect()
      .build();

    await this.conexion.start();
  }

  async desconectar(): Promise<void> {
    await this.conexion?.stop();
  }

  async crearSala(nombreSala: string): Promise<void> {
    await this.conexion?.invoke('CrearSala', nombreSala);
  }

  async unirseASala(idSala: string): Promise<void> {
    await this.conexion?.invoke('UnirseASala', idSala, 'JugadorRN');
  }

  async salirDeSala(): Promise<void> {
    await this.conexion?.invoke('SalirDeSala');
  }

  async obtenerSalas(): Promise<void> {
    await this.conexion?.invoke('ObtenerSalas');
  }

  async hacerMovimiento(fila: number, columna: number): Promise<void> {
    await this.conexion?.invoke('HacerMovimiento', fila, columna);
  }

  // EVENTOS DEL SERVIDOR

  recibirListaSalas(callback: (salas: Room[]) => void): void {
    this.conexion?.on('ListaSalas', callback);
  }

  crearSalaCallback(callback: (idSala: string, nombreSala: string) => void): void {
    this.conexion?.on('SalaCreada', callback);
  }

  unirseASalaCallback(callback: (idSala: string, nombreSala: string) => void): void {
    this.conexion?.on('UnirseASala', callback);
  }

  asignarJugador(callback: (simbolo: string, estaEsperando: boolean) => void): void {
    this.conexion?.on('AsignacionJugador', callback);
  }

  iniciarJuego(callback: (inicio: any) => void): void {
    this.conexion?.on('InicioJuego', callback);
  }

  actualizarTablero(callback: (fila: number, columna: number, simbolo: string) => void): void {
    this.conexion?.on('ActualizarTablero', callback);
  }

  cambiarTurno(callback: (simboloSiguienteJugador: string) => void): void {
    this.conexion?.on('CambiarTurno', callback);
  }

  terminarJuego(callback: (resultado: string, simboloGanador: string) => void): void {
    this.conexion?.on('TerminarJuego', callback);
  }

  desconectarOponente(callback: () => void): void {
    this.conexion?.on('OponenteDesconectado', callback);
  }

  errorSala(callback: (mensaje: string) => void): void {
    this.conexion?.on('ErrorSala', callback);
  }
}
