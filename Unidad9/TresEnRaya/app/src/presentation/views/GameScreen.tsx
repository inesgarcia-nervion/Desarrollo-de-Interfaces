import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import { GameViewModel } from '../viewmodels/GameViewModel';

type Props = {
  viewModel: GameViewModel;
  onVolverAlLobby?: () => void;
};

const GameScreen: React.FC<Props> = observer(({ viewModel, onVolverAlLobby }) => {
  const { gameState, error, mySymbol } = viewModel;

  useEffect(() => {
    return () => {
    };
  }, []);




  if (gameState.isWaiting) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <View style={styles.esperaBox}>
              <Text style={[styles.esperaSimbolo, mySymbol === 'X' ? styles.simboloX : styles.simboloO]}>
                {mySymbol || 'X'}
              </Text>
              <Text style={styles.esperaTexto}>Sala creada</Text>
              <Text style={styles.esperaSala}>{gameState.roomName || '—'}</Text>
              <Text style={[styles.esperaTexto, { marginBottom: 24 }]}>Esperando al oponente...</Text>
              <View style={styles.spinner}>
                <ActivityIndicator size="large" color="#007AFF" />
              </View>
              <TouchableOpacity 
                style={[styles.btnCancelar, { marginTop: 24 }]}
                onPress={onVolverAlLobby}
              >
                <Text style={styles.btnCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  const renderTablero = () => {
    return (
      <View style={styles.tableroGrid}>
        {gameState.board.map((fila, i) =>
          fila.map((celda, j) => {
            const value = celda || '';
            const isX = value === 'X';
            const isO = value === 'O';
            const isDisabled = value !== '' || !gameState.isGameActive || gameState.currentTurn !== mySymbol;

            return (
              <TouchableOpacity
                key={`${i}-${j}`}
                style={[
                  styles.celda,
                  isX && styles.celdaX,
                  isO && styles.celdaO,
                ]}
                onPress={() => viewModel.handleCellPress(i, j)}
                disabled={isDisabled}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.celdaTexto,
                  isX && styles.textoX,
                  isO && styles.textoO,
                ]}>
                  {value}
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {gameState.gameResult ? (
        <View style={styles.resultadoOverlay}>
          <View style={styles.resultadoCard}>
            <Text style={[
              styles.resultadoTitulo,
              gameState.gameResult === 'Winner' && styles.tituloGanador,
              gameState.gameResult === 'Loser' && styles.tituloPerdedor,
              gameState.gameResult === 'Draw' && styles.tituloEmpate,
            ]}>
              {gameState.gameResult === 'Winner' ? '¡Ganaste!' :
               gameState.gameResult === 'Loser' ? 'Perdiste' :
               '¡Empate!'}
            </Text>
            <Text style={styles.resultadoSub}>
              {gameState.gameResult === 'Winner' ? 'Eres el campeón' :
               gameState.gameResult === 'Loser' ? 'Mejor suerte la próxima' :
               'Nadie gana esta vez'}
            </Text>
            <TouchableOpacity 
              style={styles.btnSalir}
              onPress={onVolverAlLobby}
            >
              <Text style={styles.btnTextoSalir}>Salir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.juegoHeader}>
            <View style={styles.jugadorCard}>
              <Text style={[styles.jugadorSimbolo, styles.simboloX]}>X</Text>
              <Text style={styles.jugadorNombre}>Jugador1</Text>
            </View>
            <Text style={styles.vsBadge}>VS</Text>
            <View style={styles.jugadorCard}>
              <Text style={[styles.jugadorSimbolo, styles.simboloO]}>O</Text>
              <Text style={styles.jugadorNombre}>Jugador2</Text>
            </View>
          </View>
          {!gameState.gameResult && (
            <View style={[
              styles.indicadorTurno,
              gameState.currentTurn === mySymbol ? styles.miTurno : styles.otroTurno
            ]}>
              <Text style={[
                styles.indicadorTexto,
                gameState.currentTurn === mySymbol ? styles.textoMiTurno : styles.textoOtroTurno
              ]}>
                {gameState.currentTurn === mySymbol ? '⬤ Tu turno' : '⬤ Turno del oponente'}
              </Text>
            </View>
          )}
          {renderTablero()}
          <View style={styles.miSimboloBadge}>
            <Text style={styles.miSimboloTexto}>
              Juegas como{' '}
              <Text style={[
                styles.miSimboloValor,
                mySymbol === 'X' ? styles.textoX : styles.textoO
              ]}>
                {mySymbol}
              </Text>
            </Text>
          </View>
          {gameState.isGameActive && (
            <TouchableOpacity 
              style={styles.btnCancelarPartida}
              onPress={onVolverAlLobby}
              activeOpacity={0.7}
            >
              <Text style={styles.btnCancelarPartidaTexto}>Cancelar Partida</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    position: 'relative',
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#3a3a3c',
  },
  errorText: {
    color: '#FF453A',
    fontSize: 16,
    textAlign: 'center',
  },
  esperaBox: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  esperaSimbolo: {
    fontSize: 80,
    fontWeight: '700',
    lineHeight: 80,
    marginBottom: 24,
  },
  esperaTexto: {
    color: '#8e8e93',
    fontSize: 15,
    marginBottom: 8,
  },
  esperaSala: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 32,
  },
  spinner: {
    marginTop: 0,
  },
  btnCancelar: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8e8e93',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
  },
  btnCancelarTexto: {
    color: '#8e8e93',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  juegoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c2c2e',
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
  },
  jugadorCard: {
    alignItems: 'center',
    flex: 1,
  },
  jugadorSimbolo: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 8,
  },
  jugadorNombre: {
    fontSize: 13,
    color: '#8e8e93',
  },
  vsBadge: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8e8e93',
    paddingHorizontal: 16,
  },
  indicadorTurno: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  miTurno: {
    backgroundColor: 'rgba(255, 69, 58, 0.15)',
  },
  otroTurno: {
    backgroundColor: 'rgba(142, 142, 147, 0.1)',
  },
  indicadorTexto: {
    fontSize: 15,
    fontWeight: '600',
  },
  textoMiTurno: {
    color: '#FF453A',
  },
  textoOtroTurno: {
    color: '#8e8e93',
  },
  tableroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 10,
  },
  celda: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#2c2c2e',
    borderWidth: 1,
    borderColor: '#3a3a3c',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  celdaX: {
    backgroundColor: 'rgba(255, 69, 58, 0.08)',
    borderColor: 'rgba(255, 69, 58, 0.3)',
  },
  celdaO: {
    backgroundColor: 'rgba(50, 215, 75, 0.08)',
    borderColor: 'rgba(50, 215, 75, 0.3)',
  },
  celdaTexto: {
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 48,
  },
  textoX: {
    color: '#FF453A',
  },
  textoO: {
    color: '#32D74B',
  },
  simboloX: {
    color: '#FF453A',
  },
  simboloO: {
    color: '#32D74B',
  },
  miSimboloBadge: {
    backgroundColor: '#2c2c2e',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  miSimboloTexto: {
    fontSize: 14,
    color: '#8e8e93',
  },
  miSimboloValor: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 6,
  },
  resultadoOverlay: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultadoCard: {
    backgroundColor: '#1c1c1e',
    borderRadius: 16,
    paddingVertical: 48,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: '#3a3a3c',
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
  resultadoTitulo: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
    lineHeight: 40,
  },
  tituloGanador: {
    color: '#FF453A',
  },
  tituloPerdedor: {
    color: '#8e8e93',
  },
  tituloEmpate: {
    color: '#007AFF',
  },
  resultadoSub: {
    color: '#8e8e93',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  btnSalir: {
    backgroundColor: '#FF453A',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    marginTop: 20,
  },
  btnTextoSalir: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default GameScreen;
