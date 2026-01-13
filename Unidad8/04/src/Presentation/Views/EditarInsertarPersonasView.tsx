"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { EditarInsertarPersonasVM } from "../Viewmodels/EditarInsertarPersonasVM";
import { AddPersonaUseCase } from "../../Domain/Usecases/Personas/AddPersonaUseCase";
import { UpdatePersonaUseCase } from "../../Domain/Usecases/Personas/UpdatePersonaUseCase";
import { GetDepartamentosUseCase } from "../../Domain/Usecases/Departamentos/GetDepartamentosUseCase";
import { PersonaRepository } from "../../Data/Repositories/PersonaRepository";
import { DepartamentoRepository } from "../../Data/Repositories/DepartamentoRepository";
import { useRouter } from "expo-router";

type Props = {
  personaId?: string | undefined;
};

const repo = new PersonaRepository();
const deptRepo = new DepartamentoRepository();

function EditarInsertarPersonasView({ personaId }: Props) {
  const router = useRouter();
  const [vm] = useState(() => new EditarInsertarPersonasVM(new AddPersonaUseCase(repo), new UpdatePersonaUseCase(repo), new GetDepartamentosUseCase(deptRepo)));

  const styles: { [k: string]: React.CSSProperties } = {
    card: { background: '#ffffff', borderRadius: 12, padding: 20, boxShadow: '0 6px 20px rgba(16,24,40,0.08)' },
    label: { display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 600 },
    input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', outline: 'none' as const, boxSizing: 'border-box' as const },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
    header: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 },
    avatar: { width: 64, height: 64, borderRadius: 9999, objectFit: 'cover' as const, background: '#f3f4f6' },
    subtle: { fontSize: 12, color: '#6b7280' },
    primaryBtn: { background: '#059669', color: '#fff', borderRadius: 8, padding: '8px 12px', border: 'none' as const, cursor: 'pointer' as const },
    ghostBtn: { background: 'transparent', color: '#374151', borderRadius: 8, padding: '8px 12px', border: '1px solid #e5e7eb', cursor: 'pointer' as const }
  };

  useEffect(() => {
    // load persona when personaId changes (support querystring or localStorage fallback)
    const resolvedId = personaId ?? (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') ?? undefined : undefined) ?? (typeof window !== 'undefined' ? (() => { try { return localStorage.getItem('editingPersonaId') ?? undefined; } catch { return undefined; } })() : undefined);

    if (!resolvedId) return;

    (async () => {
      try {
        const idNum = Number(resolvedId);
        const pRaw: any = await repo.GetPersonaPorId(idNum);

        // backend may return either the entity directly or { persona: {...}, nombreDepartamento }
        const src = pRaw && pRaw.persona ? pRaw.persona : pRaw;
        const nombreDept = pRaw && pRaw.nombreDepartamento ? pRaw.nombreDepartamento : "";

        const id = src._id ?? src.id ?? 0;
        const nombre = src._nombre ?? src.nombre ?? "";
        const apellidos = src._apellidos ?? src.apellidos ?? src.apellido ?? "";
        let edad = src._edad ?? src.edad ?? src.edadPersona ?? 0;
        const fecha = src._fechaNacimiento ?? src.fechaNacimiento ?? src.fechaNac ?? null;
        // If backend doesn't provide edad, compute from fechaNacimiento
        if ((!edad || edad === 0) && fecha) {
          try {
            const birth = new Date(fecha);
            const now = new Date();
            let years = now.getFullYear() - birth.getFullYear();
            const m = now.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) years--;
            edad = years;
          } catch (e) {
            // keep edad as-is on parse errors
          }
        }
        const direccion = src._direccion ?? src.direccion ?? "";
        const telefono = src._telefono ?? src.telefono ?? "";
        const foto = src._foto ?? src.foto ?? null;
        const idDept = src._idDepartamento ?? src.idDepartamento ?? src.departamentoId ?? 0;

        vm.setPersona({
          _id: id,
          _nombre: nombre,
          _apellidos: apellidos,
          _edad: edad,
          _fechaNacimiento: fecha ? new Date(fecha).toISOString() : new Date().toISOString(),
          _direccion: direccion,
          _telefono: telefono,
          _foto: foto,
          _idDepartamento: idDept,
          nombreDepartamento: nombreDept
        });

        try { localStorage.removeItem('editingPersonaId'); } catch (e) { /* noop */ }
      } catch (err) {
        console.error('Error cargando persona:', err);
      }
    })();
  }, [personaId]);

  const isEditing = Boolean(vm.persona && vm.persona._id && Number(vm.persona._id) > 0);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 18 }}>
      <form
        style={styles.card}
        onSubmit={async e => {
          e.preventDefault();
          await vm.guardar();
          // After saving, navigate to the personas list
          router.push("/personas");
        }}
      >
        <div style={styles.header}>
          <img src={(vm.persona._foto ?? 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="100%" height="100%" fill="%23f3f4f6"/></svg>') as string} alt="avatar" style={styles.avatar} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>{isEditing ? 'Editar persona' : 'Crear persona'}</div>
              <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{isEditing ? (`${vm.persona._nombre || '—'} ${vm.persona._apellidos || ''}`) : 'Crear nueva persona'}</div>
          </div>
        </div>

        <div style={styles.grid}>
          <div>
            <label style={styles.label}>Nombre</label>
            <input style={styles.input} placeholder="Nombre" value={vm.persona._nombre || ""} onChange={e => (vm.persona._nombre = e.target.value)} />
          </div>

          <div>
            <label style={styles.label}>Apellidos</label>
            <input style={styles.input} placeholder="Apellidos" value={vm.persona._apellidos || ""} onChange={e => (vm.persona._apellidos = e.target.value)} />
          </div>

          <div>
            <label style={styles.label}>Edad</label>
            <input style={{ ...styles.input, background: '#f8fafc' }} type="number" placeholder="Edad" value={vm.persona._edad || 0} readOnly disabled />
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>Edad calculada a partir de la Fecha de nacimiento</div>
          </div>

          <div>
            <label style={styles.label}>Fecha de nacimiento</label>
            <input style={styles.input} type="date" value={vm.persona._fechaNacimiento ? (vm.persona._fechaNacimiento as string).slice(0,10) : ""} onChange={e => {
              const v = e.target.value; // yyyy-mm-dd
              if (v) {
                const iso = new Date(v).toISOString();
                vm.persona._fechaNacimiento = iso;
                try {
                  const birth = new Date(v);
                  const now = new Date();
                  let years = now.getFullYear() - birth.getFullYear();
                  const m = now.getMonth() - birth.getMonth();
                  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) years--;
                  vm.persona._edad = years;
                } catch (err) {
                  // keep previous edad on error
                }
              } else {
                vm.persona._fechaNacimiento = "";
              }
            }} />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={styles.label}>Dirección</label>
            <input style={styles.input} placeholder="Dirección" value={vm.persona._direccion || ""} onChange={e => (vm.persona._direccion = e.target.value)} />
          </div>

          <div>
            <label style={styles.label}>Teléfono</label>
            <input style={styles.input} placeholder="Teléfono" value={vm.persona._telefono || ""} onChange={e => (vm.persona._telefono = e.target.value)} />
          </div>

          <div>
            <label style={styles.label}>Departamento</label>
            <select style={styles.input} value={vm.persona._idDepartamento || ""} onChange={e => (vm.persona._idDepartamento = Number(e.target.value))}>
              <option value="">Seleccione Departamento</option>
              {vm.departamentos.map(d => (
                <option key={(d as any)._id ?? (d as any).id} value={(d as any)._id ?? (d as any).id}>
                  {(d as any)._nombre ?? (d as any).nombre}
                </option>
              ))}
            </select>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={styles.label}>URL de foto</label>
            <input style={styles.input} placeholder="URL de foto" value={vm.persona._foto || ""} onChange={e => (vm.persona._foto = e.target.value)} />
            {vm.persona._foto ? (<img src={(vm.persona._foto as string)} alt="foto" style={{ width: 120, height: 120, borderRadius: 8, objectFit: 'cover', marginTop: 8 }} />) : null}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
          <button type="button" onClick={() => router.back()} style={styles.ghostBtn}>
            Cancelar
          </button>
          <button type="submit" style={styles.primaryBtn}>
            {isEditing ? 'Guardar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default observer(EditarInsertarPersonasView);

