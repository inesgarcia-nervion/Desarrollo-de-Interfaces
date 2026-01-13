import { Persona } from "../../../Entities/Persona";

export interface AddPersona {
  execute(persona: Persona): Promise<number>;
}
