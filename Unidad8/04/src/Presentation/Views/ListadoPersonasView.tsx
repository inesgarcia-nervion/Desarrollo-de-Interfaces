"use client";
import React, { useEffect } from "react";
import { ListadoPersonasVM } from "../Viewmodels/ListadoPersonasVM";
import { ActionHeader } from "../Components/ActionHeader";
import { FloatingAddButton } from "../Components/FloatingAddButton";
import { GetPersonasUseCase } from "../../Domain/Usecases/Personas/GetPersonasUseCase";
import { DeletePersonaUseCase } from "../../Domain/Usecases/Personas/DeletePersonaUseCase";
import { PersonaRepository } from "../../Data/Repositories/PersonaRepository";
import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";

const repo = new PersonaRepository();
const vm = new ListadoPersonasVM(new GetPersonasUseCase(repo), new DeletePersonaUseCase(repo));

const ListadoPersonasView: React.FC = observer(() => {
  const router = useRouter();

  useEffect(() => {
    console.log('[view] ListadoPersonasView mounted, loading personas');
    vm.cargarPersonas();
  }, []);

  const onEdit = () => {
    if (vm.personaSeleccionada) {
      // store the id in localStorage as a fallback for client-side navigation
      try { localStorage.setItem('editingPersonaId', String(vm.personaSeleccionada._id)); } catch (e) { /* noop */ }
      // push full URL with query string so the route's searchParams.id receives it
      router.push(`/editarPersona?id=${vm.personaSeleccionada._id}` as any);
    }
  };

  const onDelete = async () => {
    if (vm.personaSeleccionada) {
      await vm.eliminarPersona(vm.personaSeleccionada._id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {vm.personaSeleccionada ? (
        <ActionHeader onEdit={onEdit} onDelete={onDelete} />
      ) : (
        <ActionHeader title="Listado de Personas" />
      )}

      <div style={{ padding: 12, flex: '1 1 auto', overflowY: 'auto', boxSizing: 'border-box' }}>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
          {vm.personas.map(p => (
            <li
              key={p._id}
              onClick={() => vm.seleccionarPersona(p)}
              style={{
                width: '100%',
                minHeight: '14vh',
                background: vm.personaSeleccionada?._id === p._id ? '#f0f9ff' : '#fff',
                borderRadius: 8,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                padding: 16,
                cursor: 'pointer',
                border: vm.personaSeleccionada?._id === p._id ? '1px solid #60a5fa' : '1px solid transparent',
              }}
            >
              {
                (() => {
                    // Use an embedded SVG data URI as a fallback to avoid external network requests
                    const fallback = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect width='100%' height='100%' fill='%23dddddd'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-size='12'>Foto</text></svg>";
                  const src = (p._foto || '').toString();
                  const safe = src && (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) ? src : fallback;
                  return (<img src={safe} alt={`${p._nombre} ${p._apellidos}`} style={{ width: 88, height: 88, borderRadius: 12, objectFit: 'cover', marginRight: 16, flexShrink: 0 }} />);
                })()
              }
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>{p._nombre} {p._apellidos}</div>
                    <div style={{ fontSize: 14, color: '#6b7280', marginTop: 6 }}>{p.nombreDepartamento || '—'}</div>
                  </div>
                  <div style={{ marginLeft: 8 }}>
                    <span style={{ background: '#eef2ff', color: '#4f46e5', padding: '6px 10px', borderRadius: 9999, fontSize: 13 }}>{p._edad ?? ''} años</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <FloatingAddButton onPress={() => router.push('/editarPersona' as any)} />
    </div>
  );
});

export default ListadoPersonasView;
