import { makeAutoObservable} from 'mobx';
import { createEmptyGameState, GameState } from '../../domain/entities/GameState';
import { HacerMovimientoUseCase } from '../../domain/interfaces/usecases/game/IHacerMovimientoUseCase';
import { EscucharEventosDelJuegoUseCase } from '../../domain/interfaces/usecases/game/IEscucharEventosDelJuegoUseCase';
import { ConectarseAlJuegoUseCase } from '../../domain/interfaces/usecases/game/IConectarseAlJuegoUseCase';
import { DesconectarseDelJuegoUseCase } from '../../domain/interfaces/usecases/game/IDesconectarseDelJuegoUseCase';

export class GameViewModel {
  private hacerMovimientoUC: HacerMovimientoUseCase;
  private escucharEventosUC: EscucharEventosDelJuegoUseCase;
  private conectarseUC: ConectarseAlJuegoUseCase;
  private desconectarseUC: DesconectarseDelJuegoUseCase;
  gameState: GameState = createEmptyGameState();
  mySymbol: string | null = null;

  constructor(
    hacerMovimientoUC: HacerMovimientoUseCase,
    escucharEventosUC: EscucharEventosDelJuegoUseCase,
    conectarseUC: ConectarseAlJuegoUseCase,
    desconectarseUC: DesconectarseDelJuegoUseCase
  ) {
    this.hacerMovimientoUC = hacerMovimientoUC;
    this.escucharEventosUC = escucharEventosUC;
    this.conectarseUC = conectarseUC;
    this.desconectarseUC = desconectarseUC;
    makeAutoObservable(this);
    // Aquí puedes llamar a this.setupSignalREvents() si implementas eventos
  }

  async handleCellPress(row: number, col: number) {
    if (!this.canMakeMove(row, col)) return;
    await this.hacerMovimientoUC.execute(row, col);
  }

  canMakeMove(row: number, col: number) {
    if (!this.mySymbol) return false;
    if (!this.gameState.isGameActive) return false;
    if (this.gameState.currentTurn !== this.mySymbol) return false;
    if (this.gameState.board[row][col] != null) return false;
    return true;
  }

  async connectGame() {
    await this.conectarseUC.execute();
  }

  async disconnectGame() {
    await this.desconectarseUC.execute();
  }
}

export default GameViewModel;
