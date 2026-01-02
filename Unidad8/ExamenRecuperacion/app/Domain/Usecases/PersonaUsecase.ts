import { IPersonaUsecase } from "./../Interfaces/Usecases/IPersonaUsecase";
import { IPersonaRepository } from "../Interfaces/Repositories/IPersonaRepository";
import { IDepartamentoRepository } from "../Interfaces/Repositories/IDepartamentoRepository";
import { PersonasConListadoDepartamentosDTO } from "../DTO/PersonasConListadoDepartamentosDTO";
import { ComprobarDTO } from "../DTO/ComprobarDTO";

export class PersonaUsecase implements IPersonaUsecase {
    constructor(
        private personaRepo: IPersonaRepository,
        private departamentoRepo: IDepartamentoRepository
    ) {}

    async GetPersonasConListadoDepartamentos(): Promise<PersonasConListadoDepartamentosDTO> {
        const personas = await this.personaRepo.GetListadoPersonasRepository();
        const departamentos = await this.departamentoRepo.GetListadoDepartamentosRepository();
        return new PersonasConListadoDepartamentosDTO(personas, departamentos);
    }

    async GetResultado(data: PersonasConListadoDepartamentosDTO): Promise<ComprobarDTO> {
        const personasCorrectas = await this.personaRepo.GetListadoPersonasRepository();
        let aciertos = 0;
        for (let i = 0; i < personasCorrectas.length; i++) {
        if (personasCorrectas[i].idDepartamento === data.Personas[i].idDepartamento) {
            aciertos++;
        }
        }
        const haGanado = aciertos === personasCorrectas.length;
        const mensajeHaGanado = haGanado
        ? "¡Enhorabuena, has acertado todos los departamentos!"
        : `Has acertado ${aciertos} de ${personasCorrectas.length} personas.`;
        return new ComprobarDTO(haGanado, mensajeHaGanado, aciertos);
    }
}
