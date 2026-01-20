import { IChatRepository } from '../../Interfaces/Repositories/IChatRepository';
import { clsMensajeUsuario } from '../../Entities/clsMensajeUsuario';

export class SendMessageUseCase {
  constructor(private repo: IChatRepository) {}

  async execute(m: clsMensajeUsuario) {
    await this.repo.sendMessage(m);
  }
}
