import { IGameUseCase } from './IGameUseCase';
import { IGameService } from '../../data/services/IGameService';

export class GameUseCase implements IGameUseCase {
  constructor(private gameService: IGameService) {}

  async connect() { return await this.gameService.connect(); }
  async disconnect() { return await this.gameService.disconnect(); }
  async makeMove(row: number, col: number) { return await this.gameService.makeMove(row, col); }

  onPlayerAssignment(callback: (symbol: string | null, isWaiting: boolean) => void) {
    this.gameService.onPlayerAssignment(callback);
  }

  onGameStart(callback: (player1: string | null, player2: string | null, currentTurn: string | null) => void) {
    this.gameService.onGameStart(callback);
  }

  onUpdateBoard(callback: (row: number, col: number, symbol: string) => void) {
    this.gameService.onUpdateBoard(callback);
  }

  onChangeTurn(callback: (nextPlayerSymbol: string) => void) {
    this.gameService.onChangeTurn(callback);
  }

  onGameOver(callback: (result: string, winnerSymbol?: string) => void) {
    this.gameService.onGameOver(callback);
  }

  onOpponentDisconnected(callback: () => void) {
    this.gameService.onOpponentDisconnected(callback);
  }
}
