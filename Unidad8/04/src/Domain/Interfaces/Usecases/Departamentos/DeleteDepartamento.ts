export interface DeleteDepartamento {
  execute(id: number): Promise<number>;
}
