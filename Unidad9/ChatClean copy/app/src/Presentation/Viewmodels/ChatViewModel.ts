import { makeAutoObservable, runInAction } from 'mobx';
import { useEffect, useRef, useState } from 'react';
import { Mensaje } from '../../Domain/Entities/Mensaje';
import { IChatUseCase } from '../../Domain/Usecases/IChatUseCase';
import { ChatUseCase } from '../../Domain/Usecases/ChatUseCase';
import { ChatService } from '../../Data/services/ChatService';

export class ChatViewModel {
  isLoading: boolean = true;
  mensajes: Mensaje[] = [];
  private chatUseCase: IChatUseCase;

  constructor() {
    makeAutoObservable(this);
    // Inyección de dependencias manual
    const service = new ChatService();
    this.chatUseCase = new ChatUseCase(service);
  }

  async initialize() {
    try {
      await this.chatUseCase.connect();
      this.chatUseCase.onMessageReceived((nuevoMensaje) => {
        runInAction(() => {
          this.mensajes = [...this.mensajes, nuevoMensaje];
        });
      });
      runInAction(() => (this.isLoading = false));
    } catch (error) {
      console.error('Error de conexión: ', error);
      runInAction(() => (this.isLoading = false));
    }
  }

  async enviarMensaje(texto: string, usuario: string) {
    const nuevoMensaje: Mensaje = {
      usuario,
      mensaje: texto,
    };
    await this.chatUseCase.sendMessage(nuevoMensaje);
  }

  async disconnect() {
    await this.chatUseCase.disconnect();
  }
}

// Hook adaptado a la UI solicitada
export function useChatViewModel() {
  const [messages, setMessages] = useState<{ nombre: string; mensaje: string }[]>([]);
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const useCaseRef = useRef<IChatUseCase | null>(null);
  if (useCaseRef.current === null) {
    const service = new ChatService();
    useCaseRef.current = new ChatUseCase(service);
  }

  useEffect(() => {
    let mounted = true;
    const uc = useCaseRef.current!;
    uc.connect()
      .then(() => {
        if (!mounted) return;
        setConnected(true);
        setLoading(false);
        uc.onMessageReceived((m: Mensaje) => {
          setMessages(prev => [...prev, { nombre: m.usuario, mensaje: m.mensaje }]);
        });
      })
      .catch(e => {
        if (!mounted) return;
        setError(String(e));
        setLoading(false);
      });

    return () => {
      mounted = false;
      uc.disconnect().catch(() => {});
      setConnected(false);
    };
  }, []);

  const send = async () => {
    if (!useCaseRef.current) return;
    if (!nombre.trim() || !mensaje.trim()) {
      setError('Nombre y mensaje son requeridos');
      return;
    }
    setError(null);
    const m: Mensaje = { usuario: nombre, mensaje };
    try {
      setLoading(true);
      await useCaseRef.current.sendMessage(m);
      setMensaje('');
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  return { messages, nombre, mensaje, setNombre, setMensaje, send, connected, loading, error } as const;
}