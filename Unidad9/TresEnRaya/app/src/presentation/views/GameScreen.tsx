import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GameViewModel } from '../viewmodels/GameViewModel';
import { GameService } from '../../data/services/GameService';
import { GameUseCase } from '../../domain/usecases/GameUseCase';
import { observer } from 'mobx-react-lite';
import Board from './components/Board';
import StatusMessage from './components/StatusMessage';

const service = new GameService();
const useCase = new GameUseCase(service);
const vm = new GameViewModel(useCase);

const GameScreenInner = () => {
  useEffect(() => {
    vm.initializeGame();
    return () => { vm.disconnectGame(); };
  }, []);

  return (
    <View style={styles.container}>
      <StatusMessage message={vm.getStatusMessage()} />
      <Board board={vm.gameState.board} onCellPress={(r,c) => vm.handleCellPress(r,c)} canMakeMove={(r,c) => vm.canMakeMove(r,c)} />
    </View>
  );
};

const GameScreen = observer(GameScreenInner);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }
});

export default GameScreen;
