export type Sala = {
  id: string;
  nombre: string;
  jugadoresActuales: number;
  jugadoresMaximos: number;
  estaLlena: boolean;
};

export type Player = {
  id: string;
  nombre: string;
  simbolo: string;
};

export type GameState = {
  tablero: string[][];
  turnoActual: string;
  simboloJugador1: string;
  simboloJugador2: string;
  estaEsperando: boolean;
  resultado?: string;
  simboloGanador?: string;
};
