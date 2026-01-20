import { useEffect, useState } from 'react';
import { container } from '../../Core/container';
import { clsMensajeUsuario } from '../../Domain/Entities/clsMensajeUsuario';

export function useChatViewModel() {
  const { sendMessageUseCase, getMessagesUseCase, signalRService } = container;
  const [messages, setMessages] = useState<clsMensajeUsuario[]>([]);
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Init service and load initial messages
    signalRService.init();
    getMessagesUseCase.execute().then(list => setMessages(list));
    getMessagesUseCase.subscribe((m) => setMessages(prev => [...prev, m]));

    signalRService.start()
      .then(() => setConnected(true))
      .catch(() => setConnected(false));
  }, []);

  const send = async () => {
    const obj = new clsMensajeUsuario(nombre, mensaje);
    try {
      await sendMessageUseCase.execute(obj);
      setMensaje('');
    } catch (e) {
      console.error(e);
    }
  };

  return {
    messages,
    nombre,
    mensaje,
    setNombre,
    setMensaje,
    send,
    connected,
  };
}
