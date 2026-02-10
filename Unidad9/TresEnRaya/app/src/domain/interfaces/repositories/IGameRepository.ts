export interface IGameRepository {
  hacerMovimiento(fila: number, columna: number): Promise<void>;
  escucharEventos(): void;
  resetListeners(): void;
  desconectarse(): Promise<void>;
}
