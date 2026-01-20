import { useEffect, useState } from 'react';
import { clsMensajeUsuario } from '../../Domain/Entities/clsMensajeUsuario';

// ViewModel para ChatClean siguiendo MVVM y Clean Architecture
export function useChatViewModel() {
	const [messages, setMessages] = useState<clsMensajeUsuario[]>([]);
	const [nombre, setNombre] = useState('');
	const [mensaje, setMensaje] = useState('');
	const [connected, setConnected] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Simulación de conexión y fetch (debería usar casos de uso y repositorio real)
	useEffect(() => {
		setLoading(true);
		// Aquí iría la lógica de conexión SignalR y suscripción a mensajes
		setTimeout(() => {
			setConnected(true);
			setLoading(false);
		}, 1000);
	}, []);

	const send = async () => {
		setLoading(true);
		setError(null);
		try {
			// Aquí iría la llamada al caso de uso de enviar mensaje
			const nuevo = new clsMensajeUsuario(nombre, mensaje);
			setMessages(prev => [...prev, nuevo]);
			setMensaje('');
		} catch (e) {
			setError('Error al enviar mensaje');
		} finally {
			setLoading(false);
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
		loading,
		error,
	};
}