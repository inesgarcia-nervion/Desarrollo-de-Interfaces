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

    await this.conexion.start();
  }

  estaConectado(): boolean {
    return this.conexion?.state === signalR.HubConnectionState.Connected;
  }

  async desconectar(): Promise<void> {
    await this.conexion?.stop();
  }

  async crearSala(nombreSala: string): Promise<void> {
    if (!this.estaConectado()) await this.conectar();
    await this.conexion?.invoke('CrearSala', nombreSala);
  }

  async unirseASala(idSala: string): Promise<void> {
    if (!this.estaConectado()) await this.conectar();
    await this.conexion?.invoke('UnirseASala', idSala, 'JugadorRN');
  }

  async salirDeSala(): Promise<void> {
    if (!this.estaConectado()) await this.conectar();
    await this.conexion?.invoke('SalirDeSala');
  }

  async obtenerSalas(): Promise<void> {
    if (!this.estaConectado()) await this.conectar();
    await this.conexion?.invoke('ObtenerSalas');
  }

  async hacerMovimiento(fila: number, columna: number): Promise<void> {
    if (!this.estaConectado()) await this.conectar();
    await this.conexion?.invoke('HacerMovimiento', fila, columna);
  }

  recibirListaSalas(callback: (salas: Room[]) => void): void {
    const wrapped = (salas: Room[]) => {
      try { callback(salas); } catch (e) { }
    };
    if (this.conexion) {
      this.conexion.on('ListaSalas', wrapped);
    } else {
      this.conectar().then(() => this.conexion?.on('ListaSalas', wrapped)).catch(() => {});
    }
  }

  crearSalaCallback(callback: (idSala: string, nombreSala: string) => void): void {
    if (this.conexion) {
      this.conexion.on('SalaCreada', callback);
    } else {
      this.conectar().then(() => this.conexion?.on('SalaCreada', callback)).catch(() => {});
    }
  }

  unirseASalaCallback(callback: (idSala: string, nombreSala: string) => void): void {
    const wrapped = (id: string, nombre: string) => {
      try { callback(id, nombre); } catch (e) { }
    };
    if (this.conexion) {
      this.conexion.on('UnirseASala', wrapped);
    } else {
      this.conectar().then(() => this.conexion?.on('UnirseASala', wrapped)).catch(() => {});
    }
  }

  asignarJugador(callback: (simbolo: string, estaEsperando: boolean) => void): void {
    const wrapped = (simbolo: string, estaEsperando: boolean) => {
      try { callback(simbolo, estaEsperando); } catch (e) { }
    };
    if (this.conexion) {
      this.conexion.on('AsignacionJugador', wrapped);
    } else {
      this.conectar().then(() => this.conexion?.on('AsignacionJugador', wrapped)).catch(() => {});
    }
  }

  iniciarJuego(callback: (inicio: any) => void): void {
    if (this.conexion) {
      this.conexion.on('InicioJuego', callback);
    } else {
      this.conectar().then(() => this.conexion?.on('InicioJuego', callback)).catch(() => {});
    }
  }

  actualizarTablero(callback: (fila: number, columna: number, simbolo: string) => void): void {
    if (this.conexion) {
      this.conexion.on('ActualizarTablero', callback);
    } else {
      this.conectar().then(() => this.conexion?.on('ActualizarTablero', callback)).catch(() => {});
    }
  }

  cambiarTurno(callback: (simboloSiguienteJugador: string) => void): void {
    if (this.conexion) {
      this.conexion.on('CambiarTurno', callback);
    } else {
      this.conectar().then(() => this.conexion?.on('CambiarTurno', callback)).catch(() => {});
    }
  }

  terminarJuego(callback: (resultado: string, simboloGanador: string) => void): void {
    if (this.conexion) {
      this.conexion.on('TerminarJuego', callback);
    } else {
      this.conectar().then(() => this.conexion?.on('TerminarJuego', callback)).catch(() => {});
    }
  }

  desconectarOponente(callback: (roomName?: string) => void): void {
    if (this.conexion) {
      this.conexion.on('OponenteDesconectado', callback);
    } else {
      this.conectar().then(() => this.conexion?.on('OponenteDesconectado', callback)).catch(() => {});
    }
  }

  errorSala(callback: (mensaje: string) => void): void {
    if (this.conexion) {
      this.conexion.on('ErrorSala', callback);
    } else {
      this.conectar().then(() => this.conexion?.on('ErrorSala', callback)).catch(() => {});
    }
  }
}