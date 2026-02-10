import { IGameRepository } from '../../domain/interfaces/repositories/IGameRepository';
import { SignalRConnection } from '../datasources/SignalRConnection';

export type GameEventHandlers = {
  onAsignarJugador?: (simbolo: string, estaEsperando: boolean) => void;
  onIniciarJuego?: (inicio: any) => void;
  onActualizarTablero?: (fila: number, columna: number, simbolo: string) => void;
  onCambiarTurno?: (simbolo: string) => void;
  onTerminarJuego?: (resultado: string, simboloGanador: string) => void;
  onOponenteDesconectado?: () => void;
  onErrorSala?: (mensaje: string) => void;
};

export class GameRepository implements IGameRepository {
  private handlers: GameEventHandlers = {};
  private listenersRegistered = false; // ✅ Evitar registrar duplicados

  constructor(private signalR: SignalRConnection) {}

  async hacerMovimiento(fila: number, columna: number): Promise<void> {
    await this.signalR.hacerMovimiento(fila, columna);
  }

  // ✅ Registra los handlers que el ViewModel haya configurado
  escucharEventos(): void {
    // ✅ Evitar registrar listeners múltiples veces
    if (this.listenersRegistered) {
      console.log('⚠️ Listeners ya registrados, saltando...');
      return;
    }
    this.listenersRegistered = true;
    console.log('📡 Registrando listeners de eventos del juego...');

    if (this.handlers.onAsignarJugador)
      this.signalR.asignarJugador(this.handlers.onAsignarJugador);

    if (this.handlers.onIniciarJuego)
      this.signalR.iniciarJuego(this.handlers.onIniciarJuego);

    if (this.handlers.onActualizarTablero)
      this.signalR.actualizarTablero(this.handlers.onActualizarTablero);

    if (this.handlers.onCambiarTurno)
      this.signalR.cambiarTurno(this.handlers.onCambiarTurno);

    if (this.handlers.onTerminarJuego)
      this.signalR.terminarJuego(this.handlers.onTerminarJuego);

    if (this.handlers.onOponenteDesconectado)
      this.signalR.desconectarOponente(this.handlers.onOponenteDesconectado);

    if (this.handlers.onErrorSala)
      this.signalR.errorSala(this.handlers.onErrorSala);
  }

  setHandlers(handlers: GameEventHandlers): void {
    this.handlers = handlers;
  }

  // ✅ Permitir re-registrar listeners para nuevas partidas
  resetListeners(): void {
    this.listenersRegistered = false;
  }

  async desconectarse(): Promise<void> {
    await this.signalR.desconectar();
  }
}