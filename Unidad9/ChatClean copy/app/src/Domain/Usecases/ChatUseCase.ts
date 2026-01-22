import { IChatUseCase } from './IChatUseCase';
import { IChatService } from '../../Data/services/IChatService';
import { Mensaje } from '../Entities/Mensaje';

export class ChatUseCase implements IChatUseCase {
  constructor(private chatService: IChatService) {}

  async connect() { return await this.chatService.connect(); }
  async disconnect() { return await this.chatService.disconnect(); }
  async sendMessage(mensaje: Mensaje) { return await this.chatService.sendMessage(mensaje); }
  onMessageReceived(callback: (mensaje: Mensaje) => void) {
    this.chatService.onMessageReceived(callback);
  }
}