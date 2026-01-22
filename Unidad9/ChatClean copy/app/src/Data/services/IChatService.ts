import { Mensaje } from '../../Domain/Entities/Mensaje';

export interface IChatService {
  /**
   * Establece la conexión con el servidor de SignalR.
   */
  connect(): Promise<void>;

  /**
   * Cierra la conexión activa.
   */
  disconnect(): Promise<void>;

  /**
   * Envía un objeto Mensaje al Hub.
   * @param mensaje Entidad con usuario, contenido y fecha.
   */
  sendMessage(mensaje: Mensaje): Promise<void>;

  /**
   * Suscribe un callback que se ejecutará cada vez que 
   * el servidor notifique un nuevo mensaje.
   */
  onMessageReceived(callback: (mensaje: Mensaje) => void): void;
}