import { Mensaje } from "../Entities/Mensaje";

export interface IChatUseCase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  sendMessage(mensaje: Mensaje): Promise<void>;
  onMessageReceived(callback: (mensaje: Mensaje) => void): void;
}