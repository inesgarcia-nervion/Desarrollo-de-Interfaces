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

  // ✅ Configura todos los eventos antes de llamar a escucharEventos()
  private setupEventos() {
    this.gameRepo.setHandlers({
      onAsignarJugador: (simbolo, estaEsperando) => {
        console.log('📍 AsignacionJugador:', simbolo, estaEsperando);
        this.mySymbol = simbolo;
        this.gameState.isWaiting = estaEsperando;
        this.gameState.player1Symbol = simbolo as 'X' | 'O';
      },

      onIniciarJuego: (inicio) => {
        console.log('📍 InicioJuego:', inicio);
        this.gameState.isGameActive = true;
        this.gameState.isWaiting = false;
        // ✅ CORREGIDO: Usar "turno" en lugar de "turnoActual"
        this.gameState.currentTurn = (inicio?.turno || inicio?.Turno || 'X') as 'X' | 'O';
        console.log('✅ Turno inicial:', this.gameState.currentTurn, 'Mi símbolo:', this.mySymbol);
      },

      onActualizarTablero: (fila, columna, simbolo) => {
        console.log('📍 ActualizarTablero:', fila, columna, simbolo);
        // MobX necesita que reemplaces el array para detectar el cambio
        const nuevoTablero = this.gameState.board.map(r => [...r]);
        nuevoTablero[fila][columna] = simbolo;
        this.gameState.board = nuevoTablero;
      },

      onCambiarTurno: (simbolo) => {
        console.log('📍 CambiarTurno:', simbolo);
        this.gameState.currentTurn = simbolo as 'X' | 'O';
      },

      onTerminarJuego: (resultado, simboloGanador) => {
        console.log('📍 TerminarJuego:', resultado, simboloGanador);
        this.gameState.isGameActive = false;
        this.gameState.gameResult =
          simboloGanador === this.mySymbol ? 'Winner' :
          resultado === 'empate' ? 'Draw' : 'Loser';
      },

      onOponenteDesconectado: () => {
        console.log('📍 OponenteDesconectado');
        this.gameState.isGameActive = false;
        this.error = 'El oponente se ha desconectado';
      },

      onErrorSala: (mensaje) => {
        console.log('📍 ErrorSala:', mensaje);
        this.error = mensaje;
      },
    });
  }

  async connectGame() {
    console.log('🔌 Conectando al juego...');
    this.conectarseUC.execute(); // registra los listeners
  }

  async disconnectGame() {
    await this.desconectarseUC.execute();
  }

  async handleCellPress(row: number, col: number) {
    console.log('👆 Click en celda:', row, col);
    console.log('🎮 Estado actual:', {
      mySymbol: this.mySymbol,
      currentTurn: this.gameState.currentTurn,
      isGameActive: this.gameState.isGameActive,
      cellValue: this.gameState.board[row][col]
    });
    
    if (!this.canMakeMove(row, col)) {
      console.log('❌ No puedo hacer el movimiento');
      return;
    }
    
    try {
      console.log('✅ Enviando movimiento...');
      await this.hacerMovimientoUC.execute(row, col);
    } catch (e) {
      console.error('❌ Error al hacer el movimiento:', e);
      this.error = 'Error al hacer el movimiento';
    }
  }

  canMakeMove(row: number, col: number): boolean {
    if (!this.mySymbol) {
      console.log('❌ No tengo símbolo asignado');
      return false;
    }
    if (!this.gameState.isGameActive) {
      console.log('❌ El juego no está activo');
      return false;
    }
    if (this.gameState.currentTurn !== this.mySymbol) {
      console.log('❌ No es mi turno. Turno:', this.gameState.currentTurn, 'Mi símbolo:', this.mySymbol);
      return false;
    }
    if (this.gameState.board[row][col] != null) {
      console.log('❌ La celda ya está ocupada');
      return false;
    }
    return true;
  }

  resetGame() {
    this.gameState = createEmptyGameState();
    this.mySymbol = null;
    this.error = null;
  }
}

export default GameViewModel;
