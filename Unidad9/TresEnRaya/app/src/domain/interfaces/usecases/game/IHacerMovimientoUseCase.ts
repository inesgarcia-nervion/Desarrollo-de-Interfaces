export interface HacerMovimientoUseCase {
  execute(fila: number, columna: number): Promise<void>;
}
