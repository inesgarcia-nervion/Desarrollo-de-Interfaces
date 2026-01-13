import { Persona } from "../../../Entities/Persona";

export interface UpdatePersona {
  execute(persona: Persona): Promise<number>;
}
