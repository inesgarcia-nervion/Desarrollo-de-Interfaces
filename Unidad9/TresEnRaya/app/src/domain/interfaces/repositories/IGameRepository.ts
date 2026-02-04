export interface IGameRepository {
  hacerMovimiento(fila: number, columna: number): Promise<void>;
  escucharEventos(): void;
  desconectarse(): Promise<void>;
}
