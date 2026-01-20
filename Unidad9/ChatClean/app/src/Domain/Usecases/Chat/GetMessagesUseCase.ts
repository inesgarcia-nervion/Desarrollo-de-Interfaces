import { IChatRepository } from '../../Interfaces/Repositories/IChatRepository';
import { clsMensajeUsuario } from '../../Entities/clsMensajeUsuario';

export class GetMessagesUseCase {
  constructor(private repo: IChatRepository) {}

  async execute(): Promise<clsMensajeUsuario[]> {
    return await this.repo.getInitialMessages();
  }

  subscribe(onMessage: (m: clsMensajeUsuario) => void) {
    this.repo.onMessage(onMessage);
  }
}
