import React, { useState, useEffect } from 'react';
import { container } from '../app/src/core/container';
import RoomListScreen from '../app/src/presentation/views/RoomListScreen';
import GameScreen from '../app/src/presentation/views/GameScreen';

type Pantalla = 'lista' | 'juego';

export default function Index() {
  const [pantalla, setPantalla] = useState<Pantalla>('lista');

  // ✅ Registrar los listeners del juego ANTES de unirse a cualquier sala
  // Esto asegura que no perdamos eventos como AsignacionJugador e InicioJuego
  useEffect(() => {
    container.gameViewModel.connectGame();
  }, []);

  const handleUnirseASala = async (idSala: string) => {
    // ✅ Re-registrar los listeners antes de entrar a la sala
    container.gameViewModel.connectGame();
    await container.roomListViewModel.unirseASala(idSala);
    setPantalla('juego');
  };

  const handleVolverAlLobby = async () => {
    // ✅ Notificar al servidor que salimos de la sala
    try {
      await container.signalRConnection.salirDeSala();
    } catch (e) {
      console.warn('Error al salir de la sala:', e);
    }
    
    container.gameViewModel.resetGame();
    setPantalla('lista');
    
    // ✅ Refrescar la lista de salas para obtener el conteo actualizado
    container.signalRConnection.obtenerSalas();
  };

  if (pantalla === 'juego') {
    return <GameScreen viewModel={container.gameViewModel} onVolverAlLobby={handleVolverAlLobby} />;
  }

  return (
    <RoomListScreen
      viewModel={container.roomListViewModel}
      onCrearSala={() => {}} // Ya no necesitamos pantalla separada
      onUnirseASala={handleUnirseASala}
    />
  );
}
