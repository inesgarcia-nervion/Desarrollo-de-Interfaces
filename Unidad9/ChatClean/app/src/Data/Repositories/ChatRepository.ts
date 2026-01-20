import { IChatRepository } from '../../Domain/Interfaces/Repositories/IChatRepository';
import { clsMensajeUsuario } from '../../Domain/Entities/clsMensajeUsuario';
import { SignalRApi } from '../Api/SignalRApi';

  private api: SignalRApi;
  constructor(api?: SignalRApi) {
    this.api = api ?? new SignalRApi();
  }

  async getInitialMessages(): Promise<clsMensajeUsuario[]> {
    // No persistent storage in this sample — return empty list
    return [];
  }

  async sendMessage(m: clsMensajeUsuario): Promise<void> {
    await this.api.send(m);
  }

  onMessage(callback: (m: clsMensajeUsuario) => void): void {
    this.api.onReceive(callback);
  }
}
