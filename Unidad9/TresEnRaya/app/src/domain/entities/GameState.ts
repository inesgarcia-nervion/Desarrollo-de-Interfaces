export type GameState = {
  board: (string | null)[][]; // 3x3
  player1Symbol: 'X' | 'O' | null;
  player2Symbol: 'X' | 'O' | null;
  currentTurn: 'X' | 'O' | null;
  isGameActive: boolean;
  isWaiting: boolean;
  gameResult: 'Winner' | 'Loser' | 'Draw' | null;
};

export function createEmptyGameState(): GameState {
  return {
    board: Array.from({ length: 3 }, () => [null, null, null]),
    player1Symbol: null,
    player2Symbol: null,
    currentTurn: null,
    isGameActive: false,
    isWaiting: true,
    gameResult: null,
  };
}
