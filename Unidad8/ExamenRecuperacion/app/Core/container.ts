// Core/container.ts
import { BaseApi } from "./BaseApi";
import { PersonaRepository } from "../Data/Repositories/PersonaRepository";
import { DepartamentoRepository } from "../Data/Repositories/DepartamentoRepository";
import { PersonaUsecase } from "../../app/Domain/Usecases/PersonaUsecase";

const baseApi = new BaseApi();

const personaRepository = new PersonaRepository(baseApi);
const departamentoRepository = new DepartamentoRepository(baseApi);

const personaUsecase = new PersonaUsecase(personaRepository, departamentoRepository);

export const container = {
    baseApi,
    personaRepository,
    departamentoRepository,
    personaUsecase
};
