import React from 'react';
import { View } from 'react-native';
import Tablero from './components/Tablero';
import MensajeEstado from './components/MensajeEstado';
import ResultadoJuego from './components/ResultadoJuego';
import { GameViewModel } from '../viewmodels/GameViewModel';

type Props = {
  viewModel: GameViewModel;
};

const GameScreen: React.FC<Props> = ({ viewModel }) => {
  const { gameState } = viewModel;

  // Convierte el tablero a string[][] para Tablero
  const tableroString: string[][] = gameState.board.map(fila => fila.map(celda => celda ?? ''));

  if (gameState.isWaiting) {
    return <MensajeEstado mensaje="Esperando oponente..." />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
      <Tablero tablero={tableroString} onCeldaPress={viewModel.handleCellPress.bind(viewModel)} />
      {gameState.gameResult && (
        <ResultadoJuego resultado={gameState.gameResult} simboloGanador={gameState.currentTurn ?? undefined} />
      )}
    </View>
  );
};

export default GameScreen;
