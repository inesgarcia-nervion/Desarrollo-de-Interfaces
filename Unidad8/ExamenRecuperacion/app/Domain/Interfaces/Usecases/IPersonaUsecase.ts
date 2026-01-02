import { PersonasConListadoDepartamentosDTO } from "../../DTO/PersonasConListadoDepartamentosDTO";
import { ComprobarDTO } from "../../DTO/ComprobarDTO";

export interface IPersonaUsecase {
    GetPersonasConListadoDepartamentos(): Promise<PersonasConListadoDepartamentosDTO>;
    GetResultado(data: PersonasConListadoDepartamentosDTO): Promise<ComprobarDTO>;
}
