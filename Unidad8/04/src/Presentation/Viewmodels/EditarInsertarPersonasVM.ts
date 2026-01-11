import { useState, useEffect, useCallback, useRef } from "react";
import { container } from "../../Core/container";
import { TYPES } from "../../Core/types";
import { Persona } from "../../Domain/Entities/Persona";
import { Departamento } from "../../Domain/Entities/Departamento";
import type { IPersonaUseCase } from "../../Domain/Interfaces/Usecases/IPersonaUseCase";
import type { IDepartamentoUseCase } from "../../Domain/Interfaces/Usecases/IDepartamentoUseCase";

export const useEditarInsertarPersonasVM = (pEdit?: Persona) => {
    const pUCRef = useRef(container.get<IPersonaUseCase>(TYPES.IPersonaUseCase));
    const dUCRef = useRef(container.get<IDepartamentoUseCase>(TYPES.IDepartamentoUseCase));
    const pUC = pUCRef.current;
    const dUC = dUCRef.current;

    const [nombre, setNombre] = useState(pEdit?._nombre ?? "");
    const [apellidos, setApellidos] = useState(pEdit?._apellidos ?? "");
    const [edad, setEdad] = useState(pEdit?._edad?.toString() ?? "");
    const [foto, setFoto] = useState(pEdit?._foto ?? "");
    const [idDepto, setIdDepto] = useState(pEdit?._idDepartamento ?? 0);
    const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

    // Actualizar los estados cuando cambia pEdit (cuando selecciona otra persona)
    useEffect(() => {
        setNombre(pEdit?._nombre ?? "");
        setApellidos(pEdit?._apellidos ?? "");
        setEdad(pEdit?._edad?.toString() ?? "");
        setFoto(pEdit?._foto ?? "");
        setIdDepto(pEdit?._idDepartamento ?? 0);
    }, [pEdit]);

    useEffect(() => {
        dUC.GetListadoDepartamentos().then(setDepartamentos);
    }, [dUC]);

    const guardar = useCallback(async () => {
        console.log("Guardando persona con datos:", {
            nombre, apellidos, edad, foto, idDepto,
            pEdit: pEdit?._id
        });
        const p = new Persona(
            pEdit?._id ?? 0, 
            nombre, 
            apellidos, 
            parseInt(edad) || 0, 
            pEdit?._fechaNacimiento ?? "", 
            pEdit?._direccion ?? "", 
            pEdit?._telefono ?? "", 
            idDepto, 
            foto
        );
        console.log("Objeto Persona creado:", p);
        try {
            if (pEdit?._id) {
                console.log("Editando persona...");
                await pUC.EditarPersona(p);
            } else {
                console.log("Insertando persona...");
                await pUC.InsertarPersona(p);
            }
        } catch (e) {
            console.error("Error al guardar:", e);
            throw e;
        }
    }, [pEdit, nombre, apellidos, edad, idDepto, foto, pUC]);

    return { nombre, setNombre, apellidos, setApellidos, edad, setEdad, idDepto, setIdDepto, foto, setFoto, departamentos, guardar };
};