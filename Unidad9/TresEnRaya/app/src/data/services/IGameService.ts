export interface IGameService {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  makeMove(row: number, col: number): Promise<void>;
  onPlayerAssignment(callback: (symbol: string | null, isWaiting: boolean) => void): void;
  onGameStart(callback: (player1: string | null, player2: string | null, currentTurn: string | null) => void): void;
  onUpdateBoard(callback: (row: number, col: number, symbol: string) => void): void;
  onChangeTurn(callback: (nextPlayerSymbol: string) => void): void;
  onGameOver(callback: (result: string, winnerSymbol?: string) => void): void;
  onOpponentDisconnected(callback: () => void): void;
}
