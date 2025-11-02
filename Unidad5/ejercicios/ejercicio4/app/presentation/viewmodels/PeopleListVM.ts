import { injectable, inject } from "inversify";
import { TYPES } from "../../core/types";
import { IPersonasUseCase } from "../../domain/interfaces/repositories/IPersonasUseCase";
import { Persona } from "../../domain/entities/Persona";

@injectable()
export class PeopleListVM {
    private _personaDelDia: Persona;

    constructor(@inject(TYPES.IPersonasUseCase) private useCase: IPersonasUseCase) {
        this._personaDelDia = this.useCase.getPersonaDelDia();
    }

    get personaDelDia(): Persona {
        return this._personaDelDia;
    }
}
