import * as signalR from '@microsoft/signalr';
import { HUB_URL } from '../Core/types';
import { clsMensajeUsuario } from '../Domain/Entities/clsMensajeUsuario';

// Export both the class and the singleton instance
export class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private receiveCb: ReceiveCallback | null = null;

  init(url: string = HUB_URL) {
    if (this.connection) return;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(url, { transport: signalR.HttpTransportType.WebSockets, skipNegotiation: true })
      .withAutomaticReconnect()
      .build();

    this.connection.on('ReceiveMessage', (msg: any) => {
      if (this.receiveCb) {
        const mapped = new clsMensajeUsuario(msg?.nombre ?? msg?.Nombre ?? '', msg?.mensaje ?? msg?.Mensaje ?? '', msg?.id, msg?.fecha ? new Date(msg?.fecha) : undefined, msg?.color);
        this.receiveCb(mapped);
      }
    });
  }

  async start() {
    if (!this.connection) throw new Error('SignalR not initialized');
    if (this.connection.state !== signalR.HubConnectionState.Connected) {
      await this.connection.start();
    }
  }

  onReceive(cb: ReceiveCallback) {
    this.receiveCb = cb;
  }

  async send(m: clsMensajeUsuario) {
    if (!this.connection) throw new Error('SignalR not initialized');
    await this.connection.invoke('SendMessage', m);
  }

  getState() {
    return this.connection?.state ?? signalR.HubConnectionState.Disconnected;
  }
}

export const signalRService = new SignalRService();

type ReceiveCallback = (m: clsMensajeUsuario) => void;

class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private receiveCb: ReceiveCallback | null = null;

  init(url: string = HUB_URL) {
    if (this.connection) return;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(url, { transport: signalR.HttpTransportType.WebSockets, skipNegotiation: true })
      .withAutomaticReconnect()
      .build();

    this.connection.on('ReceiveMessage', (msg: any) => {
      if (this.receiveCb) {
        const mapped = new clsMensajeUsuario(msg?.nombre ?? msg?.Nombre ?? '', msg?.mensaje ?? msg?.Mensaje ?? '');
        this.receiveCb(mapped);
      }
    });
  }

  async start() {
    if (!this.connection) throw new Error('SignalR not initialized');
    if (this.connection.state !== signalR.HubConnectionState.Connected) {
      await this.connection.start();
    }
  }

  onReceive(cb: ReceiveCallback) {
    this.receiveCb = cb;
  }

  async send(m: clsMensajeUsuario) {
    if (!this.connection) throw new Error('SignalR not initialized');
    await this.connection.invoke('SendMessage', m);
  }

  getState() {
    return this.connection?.state ?? signalR.HubConnectionState.Disconnected;
  }
}

export const signalRService = new SignalRService();
