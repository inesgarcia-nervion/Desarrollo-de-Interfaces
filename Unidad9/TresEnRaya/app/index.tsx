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
    // Prepare local UI state for a fresh match without re-registering listeners
    container.gameViewModel.prepareForJoin();
    container.gameViewModel.setRoomName(nombreSala);
    await container.roomListViewModel.unirseASala(idSala);
    setPantalla('juego');
  };

  const handleVolverAlLobby = async () => {
    // ✅ Notificar al servidor que salimos de la sala
    try {
      await container.signalRConnection.salirDeSala();
    } catch (e) {
      // ignore
    }
    
    container.gameViewModel.resetGame();
    setPantalla('lista');
    
    // ✅ Refrescar la lista de salas para obtener el conteo actualizado
    // Use the RoomListViewModel loader so loading state and errors are handled
    try {
      await container.roomListViewModel.cargarSalas();
    } catch (e) {
      // fall back to direct call if needed
      container.signalRConnection.obtenerSalas();
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
