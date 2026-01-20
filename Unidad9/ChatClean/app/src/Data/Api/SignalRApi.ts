import * as signalR from '@microsoft/signalr';
import { clsMensajeUsuario } from '../../Domain/Entities/clsMensajeUsuario';

type ReceiveCallback = (m: clsMensajeUsuario) => void;

export const HUB_URL = 'https://signalrchat20260115133618-a5esfrb0f0dmdfbh.italynorth-01.azurewebsites.net/chatHub';


export class SignalRApi {
  private connection: signalR.HubConnection | null = null;
  private receiveCb: ReceiveCallback | null = null;

  init(url: string = HUB_URL) {
    if (this.connection) return;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect()
      .build();

    this.connection.on('ReceiveMessage', (msg: any) => {
      if (this.receiveCb) {
        const mapped = new clsMensajeUsuario(
          msg?.nombre ?? msg?.Nombre ?? '',
          msg?.mensaje ?? msg?.Mensaje ?? '',
        );
        this.receiveCb(mapped);
      }
    });
  }

  async start() {
    if (!this.connection) throw new Error('SignalR not initialized');
    if (this.connection.state !== signalR.HubConnectionState.Connected) {
      try {
        await this.connection.start();
        console.log('SignalR connected');
      } catch (err) {
        console.error('SignalR start error', err);
        throw err;
      }
    }
  }

  onReceive(cb: ReceiveCallback) {
    this.receiveCb = cb;
  }

  async send(m: clsMensajeUsuario) {
    if (!this.connection) throw new Error('SignalR not initialized');
    // ensure we send plain object with expected property names
    const payload = { nombre: m.nombre, mensaje: m.mensaje };
    await this.connection.invoke('SendMessage', payload);
  }

  getState() {
    return this.connection?.state ?? signalR.HubConnectionState.Disconnected;
  }
}