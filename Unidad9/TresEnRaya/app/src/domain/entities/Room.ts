export type Room = {
  id: string;
  nombre: string;
  jugadoresActuales: number;
  jugadoresMaximos: number; // = 2
  estaLlena: boolean;
};
