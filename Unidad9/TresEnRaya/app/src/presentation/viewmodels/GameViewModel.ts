import { makeAutoObservable } from 'mobx';
import { createEmptyGameState, GameState } from '../../domain/entities/GameState';
import { HacerMovimientoUseCase } from '../../domain/interfaces/usecases/game/IHacerMovimientoUseCase';
import { EscucharEventosDelJuegoUseCase } from '../../domain/interfaces/usecases/game/IEscucharEventosDelJuegoUseCase';
import { ConectarseAlJuegoUseCase } from '../../domain/interfaces/usecases/game/IConectarseAlJuegoUseCase';
import { DesconectarseDelJuegoUseCase } from '../../domain/interfaces/usecases/game/IDesconectarseDelJuegoUseCase';
import { GameRepository } from '../../data/repositories/GameRepository';

export class GameViewModel {
  private hacerMovimientoUC: HacerMovimientoUseCase;
  private escucharEventosUC: EscucharEventosDelJuegoUseCase;
  private conectarseUC: ConectarseAlJuegoUseCase;
  private desconectarseUC: DesconectarseDelJuegoUseCase;
  private gameRepo: GameRepository;

  gameState: GameState = createEmptyGameState();
  mySymbol: string | null = null;
  error: string | null = null;

  constructor(
    hacerMovimientoUC: HacerMovimientoUseCase,
    escucharEventosUC: EscucharEventosDelJuegoUseCase,
    conectarseUC: ConectarseAlJuegoUseCase,
    desconectarseUC: DesconectarseDelJuegoUseCase,
    gameRepo: GameRepository
  ) {
    this.hacerMovimientoUC = hacerMovimientoUC;
    this.escucharEventosUC = escucharEventosUC;
    this.conectarseUC = conectarseUC;
    this.desconectarseUC = desconectarseUC;
    this.gameRepo = gameRepo;
    makeAutoObservable(this);
    this.setupEventos();
  }

  private setupEventos() {
    this.gameRepo.setHandlers({
      onAsignarJugador: (simbolo, estaEsperando) => {
        // ✅ Siempre actualizar mySymbol cuando llega AsignacionJugador.
        // El servidor lo manda tanto al unirse como al iniciar cada nueva partida
        // para garantizar que ambos jugadores tienen el símbolo correcto.
        this.mySymbol = simbolo;
        this.gameState.isWaiting = estaEsperando;
        this.gameState.player1Symbol = simbolo as 'X' | 'O';
        this.error = null;
      },

      onIniciarJuego: (inicio) => {
        this.error = null;
        this.gameState.gameResult = null;
        this.gameState.board = createEmptyGameState().board;
        this.gameState.isGameActive = true;
        this.gameState.isWaiting = false;
        this.gameState.currentTurn = (inicio?.turno || inicio?.Turno || 'X') as 'X' | 'O';
        // ✅ mySymbol ya fue actualizado por el AsignacionJugador previo al InicioJuego.
        // No hace falta tocarlo aquí.
      },

      onActualizarTablero: (fila, columna, simbolo) => {
        const nuevoTablero = this.gameState.board.map(r => [...r]);
        nuevoTablero[fila][columna] = simbolo;
        this.gameState.board = nuevoTablero;
      },

      onCambiarTurno: (simbolo) => {
        this.gameState.currentTurn = simbolo as 'X' | 'O';
      },

      onTerminarJuego: (resultado, simboloGanador) => {
        this.gameState.isGameActive = false;

        if (resultado === 'empate' || resultado === 'Empate' || resultado === 'DRAW') {
          this.gameState.gameResult = 'Draw';
        } else if (simboloGanador === this.mySymbol) {
          this.gameState.gameResult = 'Winner';
        } else if (simboloGanador !== null && simboloGanador !== undefined && simboloGanador !== '') {
          this.gameState.gameResult = 'Loser';
        } else {
          this.gameState.gameResult = 'Draw';
        }
      },

      onOponenteDesconectado: (roomName?: string) => {
        this.gameState.gameResult = null;
        this.gameState.isGameActive = false;
        this.gameState.isWaiting = true;
        if (roomName) this.gameState.roomName = roomName;
        // ✅ NO resetear mySymbol aquí. El servidor mandará AsignacionJugador
        // de confirmación con el símbolo actual (estaEsperando=true), que
        // actualizará mySymbol si fuera necesario.
      },

      onErrorSala: (mensaje) => {
        this.error = mensaje;
      },
    });
  }

  async connectGame() {
    this.conectarseUC.execute();
  }

  setRoomName(nombre: string) {
    this.gameState.roomName = nombre;
    this.error = null;
  }

  async disconnectGame() {
    await this.desconectarseUC.execute();
  }

  async salirDeSalaHandler() {
    try {
      if (this.gameRepo && typeof this.gameRepo.salirDeSala === 'function') {
        await this.gameRepo.salirDeSala();
      } else {
        await this.desconectarseUC.execute();
      }
    } catch (e) {
      this.error = 'Error al salir de sala';
    } finally {
      this.resetLocalGameState();
    }
  }

  private resetLocalGameState() {
    this.gameState = createEmptyGameState();
    this.mySymbol = null;
    this.error = null;
  }

  async handleCellPress(row: number, col: number) {
    if (!this.canMakeMove(row, col)) {
      return;
    }
    
    try {
      await this.hacerMovimientoUC.execute(row, col);
    } catch (e) {
      this.error = 'Error al hacer el movimiento';
    }
  }

  canMakeMove(row: number, col: number): boolean {
    if (!this.mySymbol) {
      return false;
    }
    if (!this.gameState.isGameActive) {
      return false;
    }
    if (this.gameState.currentTurn !== this.mySymbol) {
      return false;
    }
    if (this.gameState.board[row][col] != null) {
      return false;
    }
    return true;
  }

  resetGame() {
    this.resetLocalGameState();
  }

  // ✅ FIX CLAVE: prepareForJoin NO resetea mySymbol.
  // El símbolo llegará vía AsignacionJugador desde el servidor,
  // que ahora se manda a ambos jugadores al iniciar cada partida.
  // Si se resetea aquí a null y AsignacionJugador llega antes que InicioJuego
  // (el orden normal), todo va bien. Pero si por alguna razón InicioJuego
  // llega primero, canMakeMove devolvería false porque mySymbol = null.
  // Mantener el valor anterior es siempre más seguro.
  prepareForJoin() {
    this.gameState.gameResult = null;
    this.gameState.board = createEmptyGameState().board;
    this.gameState.isGameActive = false;
    this.gameState.currentTurn = 'X';
    this.gameState.isWaiting = true;
    // ✅ NO poner mySymbol = null aquí
    this.error = null;
  }
}

export default GameViewModel;