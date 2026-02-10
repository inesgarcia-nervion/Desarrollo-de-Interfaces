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
      this.gameState.isWaiting = false;
      this.gameState.roomName = null;
    }
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
    this.gameState = createEmptyGameState();
    this.mySymbol = null;
    this.error = null;
    this.gameRepo.resetListeners();
    this.conectarseUC.execute();
  }
  prepareForJoin() {
    this.gameState.gameResult = null;
    this.gameState.board = createEmptyGameState().board;
    this.gameState.isGameActive = false;
    this.gameState.currentTurn = 'X';
    this.mySymbol = null;
    this.error = null;
  }
}

export default GameViewModel;
