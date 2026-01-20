import { clsMensajeUsuario } from '../../Entities/clsMensajeUsuario';

export interface IChatRepository {
  getInitialMessages(): Promise<clsMensajeUsuario[]>;
  sendMessage(m: clsMensajeUsuario): Promise<void>;
  onMessage(callback: (m: clsMensajeUsuario) => void): void;
}
