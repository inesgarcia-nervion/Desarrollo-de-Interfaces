export interface DeletePersona {
  execute(id: number): Promise<number>;
}
