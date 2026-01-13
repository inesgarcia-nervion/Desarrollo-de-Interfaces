"use client";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { EditarInsertarDepartamentosVM } from "../Viewmodels/EditarInsertarDepartamentosVM";
import { AddDepartamentoUseCase } from "../../Domain/Usecases/Departamentos/AddDepartamentoUseCase";
import { UpdateDepartamentoUseCase } from "../../Domain/Usecases/Departamentos/UpdateDepartamentoUseCase";
import { DepartamentoRepository } from "../../Data/Repositories/DepartamentoRepository";
import { useRouter } from "expo-router";

function EditarInsertarDepartamentosView({ departamentoId }: { departamentoId?: string }) {
  const router = useRouter();
  const departamentoRepo = new DepartamentoRepository();
  const [vm] = useState(() => new EditarInsertarDepartamentosVM(new AddDepartamentoUseCase(departamentoRepo), new UpdateDepartamentoUseCase(departamentoRepo)));

  useEffect(() => {
    const resolvedId = departamentoId ?? (typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') ?? undefined : undefined) ?? (typeof window !== 'undefined' ? (() => { try { return localStorage.getItem('editingDeptoId') ?? undefined; } catch { return undefined; } })() : undefined);

    if (!resolvedId) return;

    (async () => {
      try {
        const id = Number(resolvedId);
        const d = await departamentoRepo.GetDepartamentoPorId(id);
        if (d) {
          vm.setDepartamento({ _id: d.id, _nombre: d.nombre });
        }
        try { localStorage.removeItem('editingDeptoId'); } catch (e) { /* noop */ }
      } catch (err) {
        console.error('Error cargando departamento:', err);
      }
    })();
  }, [departamentoId]);

  const styles: { [k: string]: React.CSSProperties } = {
    card: { background: '#ffffff', borderRadius: 12, padding: 20, boxShadow: '0 6px 20px rgba(16,24,40,0.08)', maxWidth: 720, margin: '0 auto' },
    label: { display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 600 },
    input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', outline: 'none' as const, boxSizing: 'border-box' as const },
    primaryBtn: { background: '#059669', color: '#fff', borderRadius: 8, padding: '8px 12px', border: 'none' as const, cursor: 'pointer' as const },
    ghostBtn: { background: 'transparent', color: '#374151', borderRadius: 8, padding: '8px 12px', border: '1px solid #e5e7eb', cursor: 'pointer' as const }
  };

  const isEditing = Boolean(vm.departamento && vm.departamento._id && Number(vm.departamento._id) > 0);

  return (
    <div style={{ padding: 18 }}>
      <form
        style={styles.card}
        onSubmit={async e => {
          e.preventDefault();
          await vm.guardar();
          router.push("/departamento");
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4338ca', fontWeight: 700 }}>{(vm.departamento._nombre || '').charAt(0).toUpperCase()}</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>{isEditing ? 'Editar Departamento' : 'Crear Departamento'}</div>
            <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{isEditing ? vm.departamento._nombre : 'Rellena el nombre del departamento'}</div>
          </div>
        </div>

        <div>
          <label style={styles.label}>Nombre</label>
          <input style={styles.input} placeholder="Nombre del Departamento" value={vm.departamento._nombre || ""} onChange={e => (vm.departamento._nombre = e.target.value)} />
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
          <button type="button" onClick={() => router.push('/departamento')} style={styles.ghostBtn}>Cancelar</button>
          <button type="submit" style={styles.primaryBtn}>{isEditing ? 'Guardar' : 'Crear'}</button>
        </div>
      </form>
    </div>
  );
}

export default observer(EditarInsertarDepartamentosView);
