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

  const handleUnirseASala = async (idSala: string, nombreSala: string) => {
    // ✅ Prepare local UI state for a fresh match without re-registering listeners
    container.gameViewModel.prepareForJoin();
    container.gameViewModel.setRoomName(nombreSala);
    
    try {
      await container.roomListViewModel.unirseASala(idSala);
      setPantalla('juego');
    } catch (e) {
      // Handle error - stay on lobby screen
      console.error('Error joining room:', e);
    }
  };

  const handleVolverAlLobby = async () => {
    // ✅ CRITICAL: First set the screen back to lobby IMMEDIATELY
    // This prevents the user from seeing stale game state
    setPantalla('lista');
    
    // ✅ Then handle cleanup asynchronously
    try {
      // Notify server we're leaving the room
      await container.signalRConnection.salirDeSala();
    } catch (e) {
      console.error('Error leaving room:', e);
    }
    
    // ✅ Reset local game state
    container.gameViewModel.resetGame();
    
    // ✅ Refresh room list to show updated player counts
    try {
      await container.roomListViewModel.cargarSalas();
    } catch (e) {
      // Fallback to direct call if needed
      try {
        await container.signalRConnection.obtenerSalas();
      } catch (err) {
        console.error('Error refreshing room list:', err);
      }
    }
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
