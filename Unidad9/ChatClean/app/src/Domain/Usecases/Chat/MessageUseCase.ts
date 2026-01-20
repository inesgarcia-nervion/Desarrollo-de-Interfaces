import { clsMensajeUsuario } from '../../Entities/clsMensajeUsuario';
import { IChatRepository } from '../../Interfaces/Repositories/IChatRepository';

export class MessageUseCase {
  private repo: IChatRepository;
  constructor(repo: IChatRepository) {
    this.repo = repo;
  }

  async send(m: clsMensajeUsuario) {
    await this.repo.sendMessage(m);
  }

  async getAll(): Promise<clsMensajeUsuario[]> {
    return await this.repo.getInitialMessages();
  }

  onReceive(callback: (m: clsMensajeUsuario) => void) {
    this.repo.onMessage(callback);
  }
}
