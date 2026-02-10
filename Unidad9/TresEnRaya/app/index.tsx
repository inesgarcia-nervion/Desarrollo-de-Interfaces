import React, { useState } from 'react';
import { container } from '../app/src/core/container';
import RoomListScreen from '../app/src/presentation/views/RoomListScreen';
import GameScreen from '../app/src/presentation/views/GameScreen';

type Pantalla = 'lista' | 'juego';

export default function Index() {
  const [pantalla, setPantalla] = useState<Pantalla>('lista');

  const handleUnirseASala = async (idSala: string) => {
    await container.roomListViewModel.unirseASala(idSala);
    setPantalla('juego');
  };

  const handleVolverAlLobby = () => {
    container.gameViewModel.resetGame();
    setPantalla('lista');
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
