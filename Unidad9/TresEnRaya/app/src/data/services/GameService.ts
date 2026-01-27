import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { IGameService } from './IGameService';

// SignalR-backed service implementing the client interface.
export class GameService implements IGameService {
  private connection: HubConnection | null = null;
  private serverUrl: string;

  constructor(serverUrl?: string) {
    this.serverUrl = serverUrl ?? 'https://signalrchat20260115133618-a5esfrb0f0dmdfbh.italynorth-01.azurewebsites.net/chatHub';
  }

  private ensureConnection() {
    if (!this.connection) {
      this.connection = new HubConnectionBuilder()
        .withUrl(this.serverUrl)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();
    }
  }

  async connect(): Promise<void> {
    this.ensureConnection();
    if (!this.connection) return;
    if (this.connection.state !== 'Connected') await this.connection.start();
  }

  async disconnect(): Promise<void> {
    if (!this.connection) return;
    if (this.connection.state === 'Connected') await this.connection.stop();
    this.connection = null;
  }

  async makeMove(row: number, col: number): Promise<void> {
    if (!this.connection) throw new Error('No connection');
    if (this.connection.state === 'Connected') {
      await this.connection.invoke('MakeMove', row, col);
    } else {
      throw new Error('Not connected');
    }
  }

  onPlayerAssignment(callback: (symbol: string | null, isWaiting: boolean) => void): void {
    this.ensureConnection();
    this.connection?.on('ReceivePlayerAssignment', (symbol: string | null, isWaiting: boolean) => callback(symbol, isWaiting));
  }
  onGameStart(callback: (player1: string | null, player2: string | null, currentTurn: string | null) => void): void {
    this.ensureConnection();
    this.connection?.on('StartGame', (p1: string | null, p2: string | null, currentTurn: string | null) => callback(p1, p2, currentTurn));
  }
  onUpdateBoard(callback: (row: number, col: number, symbol: string) => void): void {
    this.ensureConnection();
    this.connection?.on('UpdateBoard', (row: number, col: number, symbol: string) => callback(row, col, symbol));
  }
  onChangeTurn(callback: (nextPlayerSymbol: string) => void): void {
    this.ensureConnection();
    this.connection?.on('ChangeTurn', (next: string) => callback(next));
  }
  onGameOver(callback: (result: string, winnerSymbol?: string) => void): void {
    this.ensureConnection();
    this.connection?.on('GameOver', (result: string, winnerSymbol?: string) => callback(result, winnerSymbol));
  }
  onOpponentDisconnected(callback: () => void): void {
    this.ensureConnection();
    this.connection?.on('OpponentDisconnected', () => callback());
  }
}
