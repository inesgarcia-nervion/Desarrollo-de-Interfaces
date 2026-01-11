import { injectable, inject } from "inversify";
import { TYPES } from "../../Core/types";
import { PersonaMayorDeEdadDTO } from "../DTO/PersonaMayorDeEdadDTO";
import { EliminarPersonaDTO } from "../DTO/EliminarPersonaDTO";
import { Persona } from "../Entities/Persona";
import type { IPersonaRepository } from "../Interfaces/Repositories/IPersonaRepository";

// Función para calcular edad a partir de fecha de nacimiento
function calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - fechaNac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }
    return edad;
}

// Función para mapear la respuesta de la API a la entidad Persona
function mapApiToPersona(item: any): Persona {
    // La API devuelve { persona: {...}, nombreDepartamento: "..." }
    const p = item.persona || item;
    return new Persona(
        p.id ?? p._id,
        p.nombre ?? p._nombre,
        p.apellido ?? p._apellidos,
        calcularEdad(p.fechaNacimiento ?? p._fechaNacimiento),
        p.fechaNacimiento ?? p._fechaNacimiento,
        p.direccion ?? p._direccion,
        p.telefono ?? p._telefono,
        p.idDepartamento ?? p._idDepartamento,
        p.foto ?? p._foto
    );
}

@injectable()
export class PersonaUseCase {
    constructor(
        @inject(TYPES.IPersonaRepository) private personaRepo: IPersonaRepository
    ) {}

    async getPersonaMayorDeEdadDTO(): Promise<PersonaMayorDeEdadDTO> {
        const data = await this.personaRepo.GetListadoPersonas();
        const rawList = data || [];
        
        // Mapear cada item de la API a nuestra entidad Persona
        const personas = rawList.map(mapApiToPersona);
        
        const hoy = new Date().getDay();
        const filtradas = (hoy === 5 || hoy === 6) 
            ? personas.filter(p => p._edad >= 18) 
            : personas;

        return { ListadoPersona: filtradas, diaSemana: hoy };
    }

    async getEliminarPersonaDTO(): Promise<EliminarPersonaDTO> {
        const data = await this.personaRepo.GetListadoPersonas();
        const rawList = data || [];
        const personas = rawList.map(mapApiToPersona);
        const hoy = new Date().getDay();
        return { 
            ListadoPersona: personas, 
            diaSemana: hoy, 
            puedeEliminar: hoy !== 0 
        };
    }

    async InsertarPersona(p: Persona) { return this.personaRepo.InsertarPersona(p); }
    async EditarPersona(p: Persona) { return this.personaRepo.EditarPersona(p); }
    async EliminarPersona(id: number) { return this.personaRepo.EliminarPersona(id); }
}