import * as signalR from '@microsoft/signalr';
import { Mensaje } from '../../Domain/Entities/Mensaje';
import { IChatService } from './IChatService';

export const HUB_URL = 'https://signalrchat20260115133618-a5esfrb0f0dmdfbh.italynorth-01.azurewebsites.net/chatHub';

export class ChatService implements IChatService {
  private connection: signalR.HubConnection | null = null;

  async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(HUB_URL, {
          transport: signalR.HttpTransportType.WebSockets,
          skipNegotiation: true,
        })
        .withAutomaticReconnect()
        .build();
    }
    await this.connection.start();
    console.log('Conectado a SignalR en Azure');
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }

  async sendMessage(mensaje: Mensaje): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      // Muchos hubs esperan (user, message) en lugar de un objeto completo.
      // Aquí mapeamos la entidad Mensaje a los parámetros que suele recibir el Hub.
      await this.connection.invoke('SendMessage', mensaje.usuario, mensaje.mensaje);
    } else {
      throw new Error('No hay conexion con el servidor');
    }
  }

  onMessageReceived(callback: (mensaje: Mensaje) => void): void {
    // El servidor suele enviar (user, message). Normalizamos a la entidad Mensaje.
    this.connection?.on('ReceiveMessage', (user: string, message: string, ...rest: any[]) => {
      const m: Mensaje = { usuario: user, mensaje: message };
      callback(m);
    });
  }
}