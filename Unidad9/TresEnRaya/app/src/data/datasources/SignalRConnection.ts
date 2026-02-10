import * as signalR from '@microsoft/signalr';
import { Room } from '../../domain/entities/Room';

export class SignalRConnection {
  private conexion: signalR.HubConnection | null = null;
  private urlServidor: string;

  constructor(urlServidor: string) {
    this.urlServidor = urlServidor;
  }

  async conectar(): Promise<void> {
    if (
      this.conexion &&
      this.conexion.state === signalR.HubConnectionState.Connected
    ) {
      return;
    }

    this.conexion = new signalR.HubConnectionBuilder()
      .withUrl(this.urlServidor, {
        transport:
          signalR.HttpTransportType.WebSockets |
          signalR.HttpTransportType.LongPolling,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.conexion.onreconnecting((error) => {
      console.warn('SignalR reconectando...', error);
    });

    this.conexion.onreconnected((connectionId) => {
      console.log('SignalR reconectado:', connectionId);
    });

    this.conexion.onclose((error) => {
      console.error('SignalR conexión cerrada:', error);
    });

    await this.conexion.start();
    console.log('SignalR conectado ✅');
  }

  estaConectado(): boolean {
    return this.conexion?.state === signalR.HubConnectionState.Connected;
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