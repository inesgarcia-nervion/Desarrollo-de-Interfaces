import React, { useState, useEffect } from 'react';
import { container } from '../app/src/core/container';
import RoomListScreen from '../app/src/presentation/views/RoomListScreen';
import GameScreen from '../app/src/presentation/views/GameScreen';

type Pantalla = 'lista' | 'juego';

export default function Index() {
  const [pantalla, setPantalla] = useState<Pantalla>('lista');

  useEffect(() => {
    container.gameViewModel.connectGame();
  }, []);

  const handleUnirseASala = async (idSala: string, nombreSala: string) => {
    container.gameViewModel.prepareForJoin();
    container.gameViewModel.setRoomName(nombreSala);
    
    try {
      await container.roomListViewModel.unirseASala(idSala);
      setPantalla('juego');
    } catch (e) {
      console.error('Error joining room:', e);
    }
  };

  const handleVolverAlLobby = async () => {
    setPantalla('lista');
    
    try {
      await container.signalRConnection.salirDeSala();
    } catch (e) {
      console.error('Error leaving room:', e);
    }
    
    container.gameViewModel.resetGame();
    
    try {
      await container.roomListViewModel.cargarSalas();
    } catch (e) {
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
      onCrearSala={() => {}} 
      onUnirseASala={handleUnirseASala}
    />
  );
}
