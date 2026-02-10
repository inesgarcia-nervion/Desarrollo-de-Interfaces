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
        console.log('📍 AsignacionJugador:', simbolo, estaEsperando);
        this.mySymbol = simbolo;
        this.gameState.isWaiting = estaEsperando;
        this.gameState.player1Symbol = simbolo as 'X' | 'O';
        this.error = null;
      },

      onIniciarJuego: (inicio) => {
        console.log('📍 InicioJuego:', inicio);
        this.error = null;
        this.gameState.isGameActive = true;
        this.gameState.isWaiting = false;
        this.gameState.currentTurn = (inicio?.turno || inicio?.Turno || 'X') as 'X' | 'O';
        console.log('✅ Turno inicial:', this.gameState.currentTurn, 'Mi símbolo:', this.mySymbol);
      },

      onActualizarTablero: (fila, columna, simbolo) => {
        console.log('📍 ActualizarTablero:', fila, columna, simbolo);
        const nuevoTablero = this.gameState.board.map(r => [...r]);
        nuevoTablero[fila][columna] = simbolo;
        this.gameState.board = nuevoTablero;
      },

      onCambiarTurno: (simbolo) => {
        console.log('📍 CambiarTurno:', simbolo);
        this.gameState.currentTurn = simbolo as 'X' | 'O';
      },

      onTerminarJuego: (resultado, simboloGanador) => {
        console.log('🏁 ==================== TERMINAR JUEGO ====================');
        console.log('   Resultado:', resultado);
        console.log('   Símbolo Ganador del servidor:', simboloGanador);
        console.log('   Mi Símbolo:', this.mySymbol);
        console.log('   Estado del Tablero:', JSON.stringify(this.gameState.board));
        console.log('=========================================================');
        
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
        
        console.log('   Resultado Final asignado al UI:', this.gameState.gameResult);
      },

      onOponenteDesconectado: () => {
        console.log('📍 OponenteDesconectado');
        if (this.gameState.isGameActive) {
          console.log('  -> Juego activo, volviendo a espera');
          this.gameState.isGameActive = false;
          this.gameState.isWaiting = true;
        } else if (this.gameState.isWaiting) {
          console.log('  -> Estábamos esperando, volvemos a esperar');
        } else {
          console.log('  -> Estado desconocido');
        }
      },

      onErrorSala: (mensaje) => {
        console.log('📍 ErrorSala:', mensaje);
        this.error = mensaje;
      },
    });
  }

  async connectGame() {
    console.log('🔌 Conectando al juego...');
    this.conectarseUC.execute();
  }

  setRoomName(nombre: string) {
    console.log('📍 Estableciendo nombre de sala:', nombre);
    this.gameState.roomName = nombre;
    this.error = null;
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
    console.log('🔄 ResetGame - Limpiando estado del juego');
    this.gameState = createEmptyGameState();
    this.mySymbol = null;
    this.error = null;
    this.gameRepo.resetListeners();
    this.conectarseUC.execute();
  }
}

export default GameViewModel;
