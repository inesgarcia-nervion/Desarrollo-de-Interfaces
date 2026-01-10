import { useState, useEffect } from "react";
import { container } from "../../Core/container";
import { TYPES } from "../../Core/types";
import { Persona } from "../../Domain/Entities/Persona";
import { Departamento } from "../../Domain/Entities/Departamento";
import type { IPersonaUseCase } from "../../Domain/Interfaces/Usecases/IPersonaUseCase";
import type { IDepartamentoUseCase } from "../../Domain/Interfaces/Usecases/IDepartamentoUseCase";

export const EditarInsertarPersonasVM = (pEdit?: Persona) => {
    const pUC = container.get<IPersonaUseCase>(TYPES.IPersonaUseCase);
    const dUC = container.get<IDepartamentoUseCase>(TYPES.IDepartamentoUseCase);

    const [nombre, setNombre] = useState(pEdit?._nombre ?? "");
    const [apellidos, setApellidos] = useState(pEdit?._apellidos ?? "");
    const [edad, setEdad] = useState(pEdit?._edad?.toString() ?? "");
    const [foto, setFoto] = useState(pEdit?._foto ?? "");
    const [idDepto, setIdDepto] = useState(pEdit?._idDepartamento ?? 0);
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

    useEffect(() => {
        dUC.GetListadoDepartamentos().then(setDepartamentos);
    }, [dUC]);

    const guardar = async () => {
        const p = new Persona(pEdit?._id ?? 0, nombre, apellidos, parseInt(edad) || 0, "", "", "", idDepto, foto);
        if (pEdit) await pUC.EditarPersona(p);
        else await pUC.InsertarPersona(p);
    };

    return { nombre, setNombre, apellidos, setApellidos, edad, setEdad, idDepto, setIdDepto, foto, setFoto, departamentos, guardar };
};