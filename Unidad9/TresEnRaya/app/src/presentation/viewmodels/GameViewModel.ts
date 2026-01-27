import { makeAutoObservable, runInAction } from 'mobx';
import { createEmptyGameState, GameState } from '../../domain/entities/GameState';
import { IGameUseCase } from '../../domain/usecases/IGameUseCase';

export class GameViewModel {
  private useCase: IGameUseCase;
  gameState: GameState = createEmptyGameState();
  mySymbol: 'X' | 'O' | null = null;

  constructor(useCase: IGameUseCase) {
    this.useCase = useCase;
    makeAutoObservable(this);
  }

  async initializeGame() {
    await this.useCase.connect();
    this.setupListeners();
  }

  private setupListeners() {
    this.useCase.onPlayerAssignment((symbol, isWaiting) => {
      runInAction(() => {
        this.mySymbol = symbol as any;
        this.gameState.isWaiting = isWaiting;
      });
    });

    this.useCase.onGameStart((p1, p2, current) => {
      runInAction(() => {
        this.gameState.player1Symbol = p1 as any;
        this.gameState.player2Symbol = p2 as any;
        this.gameState.currentTurn = current as any;
        this.gameState.isGameActive = true;
        this.gameState.isWaiting = false;
      });
    });

    this.useCase.onUpdateBoard((row, col, symbol) => {
      runInAction(() => {
        this.gameState.board[row][col] = symbol;
      });
    });

    this.useCase.onChangeTurn((next) => {
      runInAction(() => {
        this.gameState.currentTurn = next as any;
      });
    });

    this.useCase.onGameOver((result, winner) => {
      runInAction(() => {
        this.gameState.gameResult = result as any;
        this.gameState.isGameActive = false;
      });
    });

    this.useCase.onOpponentDisconnected(() => {
      runInAction(() => {
        this.gameState.isWaiting = true;
        this.gameState.isGameActive = false;
      });
    });
  }

  async handleCellPress(row: number, col: number) {
    if (!this.canMakeMove(row, col)) return;
    await this.useCase.makeMove(row, col);
  }

  canMakeMove(row: number, col: number) {
    if (!this.mySymbol) return false;
    if (!this.gameState.isGameActive) return false;
    if (this.gameState.currentTurn !== this.mySymbol) return false;
    if (this.gameState.board[row][col] != null) return false;
    return true;
  }

  getStatusMessage(): string {
    if (this.gameState.isWaiting) return 'Esperando oponente...';
    if (!this.gameState.isGameActive && this.gameState.gameResult) {
      if (this.gameState.gameResult === 'Winner' && this.mySymbol === this.gameState.currentTurn) return 'Vencedor';
      if (this.gameState.gameResult === 'Loser') return 'Perdedor';
      return 'Tablas';
    }
    if (this.gameState.currentTurn === this.mySymbol) return 'Tu turno';
    return 'Turno del oponente';
  }

  async disconnectGame() {
    await this.useCase.disconnect();
  }
}
