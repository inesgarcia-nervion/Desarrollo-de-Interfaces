export type Player = {
  connectionId: string;
  symbol: 'X' | 'O' | null;
  isTurn: boolean;
  name?: string;
};
