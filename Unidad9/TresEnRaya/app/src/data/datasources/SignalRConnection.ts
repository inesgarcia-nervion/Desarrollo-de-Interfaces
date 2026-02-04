import { HubConnection } from '@microsoft/signalr';
import { Room } from '../../domain/entities/Room';

export class SignalRConnection {
  private conexion: HubConnection | null = null;
  private urlServidor: string;

  constructor(urlServidor: string) {
    this.urlServidor = urlServidor;
  }

  
  async conectar(): Promise<void> {}
  async desconectar(): Promise<void> {}
  async crearSala(nombreSala: string): Promise<void> {}
  async unirseASala(idSala: string): Promise<void> {}
  async salirDeSala(): Promise<void> {}
  async obtenerSalas(): Promise<void> {}
  async hacerMovimiento(fila: number, columna: number): Promise<void> {}

  recibirListaSalas(callback: (salas: Room[]) => void): void {}
  crearSalaCallback(callback: (idSala: string, nombreSala: string) => void): void {}
  unirseASalaCallback(callback: (idSala: string, nombreSala: string) => void): void {}
  asignarJugador(callback: (simbolo: string, estaEsperando: boolean) => void): void {}
  iniciarJuego(callback: (simboloJugador1: string, simboloJugador2: string, turnoActual: string) => void): void {}
  actualizarTablero(callback: (fila: number, columna: number, simbolo: string) => void): void {}
  cambiarTurno(callback: (simboloSiguienteJugador: string) => void): void {}
  terminarJuego(callback: (resultado: string, simboloGanador: string) => void): void {}
  desconectarOponente(callback: () => void): void {}
  errorSala(callback: (mensaje: string) => void): void {}
}
