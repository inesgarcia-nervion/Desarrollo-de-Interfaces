import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from '../components/Cell';

type Props = {
  board: (string | null)[][];
  onCellPress: (row: number, col: number) => void;
  canMakeMove: (row: number, col: number) => boolean;
};

const Board: React.FC<Props> = ({ board, onCellPress, canMakeMove }) => {
  return (
    <View style={styles.board}>
      {board.map((row, rIdx) => (
        <View key={`row-${rIdx}`} style={styles.row}>
          {row.map((cell, cIdx) => (
            <Cell key={`cell-${rIdx}-${cIdx}`} value={cell} onPress={() => onCellPress(rIdx, cIdx)} disabled={!canMakeMove(rIdx, cIdx)} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: { },
  row: { flexDirection: 'row' }
});

export default Board;
