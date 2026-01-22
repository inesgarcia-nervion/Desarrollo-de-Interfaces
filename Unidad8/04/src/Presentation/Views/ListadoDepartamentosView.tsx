"use client";
import React, { useEffect, useState } from "react";
import { Platform, View, TextInput, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { ListadoDepartamentosVM } from "../Viewmodels/ListadoDepartamentosVM";
import { ActionHeader } from "../Components/ActionHeader";
import { FloatingAddButton } from "../Components/FloatingAddButton";
import { GetDepartamentosUseCase } from "../../Domain/Usecases/Departamentos/GetDepartamentosUseCase";
import { DeleteDepartamentoUseCase } from "../../Domain/Usecases/Departamentos/DeleteDepartamentoUseCase";
import { DepartamentoRepository } from "../../Data/Repositories/DepartamentoRepository";
import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";

const departamentoRepo = new DepartamentoRepository();
const vm = new ListadoDepartamentosVM(new GetDepartamentosUseCase(departamentoRepo), new DeleteDepartamentoUseCase(departamentoRepo));

const ListadoDepartamentosView: React.FC = observer(() => {
  const router = useRouter();

  const [msg, setMsg] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    console.log('[view] ListadoDepartamentosView mounted, loading departamentos');
    vm.cargarDepartamentos();
  }, []);

  const handleDelete = async () => {
    if (!vm.deptoSeleccionado) return;
    try {
      await vm.eliminarDepartamento(vm.deptoSeleccionado._id);
      // clear selection and show confirmation
      vm.deptoSeleccionado = null as any;
      setMsg('Departamento eliminado correctamente');
      setTimeout(() => setMsg(null), 2500);
    } catch (err) {
      console.error('Error eliminando departamento:', err);
    }
  };

  // Web rendering
  if (Platform.OS === 'web') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', paddingTop: 110, background: '#f8fafc' }}>
        <ActionHeader title="Listado de Departamentos" />

        {/* Buscador: web usa <input>, native usa TextInput */}
        <div style={{ padding: 12 }}>
          <input placeholder="Buscar departamentos..." value={query} onChange={e => setQuery(e.target.value)} style={{ padding: 8, width: '100%', borderRadius: 8, border: '1px solid #e5e7eb' }} />
        </div>

        {msg ? (
          <div style={{ margin: 12, padding: 10, borderRadius: 8, background: '#ecfdf5', color: '#065f46', border: '1px solid #bbf7d0' }}>{msg}</div>
        ) : null}

        {vm.deptoSeleccionado ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', background: '#f8fafc', borderBottom: '1px solid #e6eef8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 8, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4338ca', fontWeight: 700 }}>{(vm.deptoSeleccionado._nombre || '').charAt(0).toUpperCase()}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{vm.deptoSeleccionado._nombre}</div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>Departamento seleccionado</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => {
                try { localStorage.setItem('editingDeptoId', String((vm.deptoSeleccionado as any)._id)); } catch (e) { /* noop */ }
                router.push(`/editarDepto?id=${(vm.deptoSeleccionado as any)._id}` as any);
              }} style={{ background: '#059669', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }}>Editar</button>
              <button onClick={handleDelete} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }}>Borrar</button>
            </div>
          </div>
        ) : null}

        <div style={{ padding: 12, flex: '1 1 auto', overflowY: 'auto', boxSizing: 'border-box' }}>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
            { (vm.departamentos || []).filter(d => {
                if (!query) return true;
                return (d._nombre || '').toString().toLowerCase().indexOf(query.toLowerCase()) !== -1;
              }).map(d => (
              <li
                key={d._id}
                onClick={() => vm.seleccionarDepartamento(d)}
                style={{
                  width: '100%',
                  minHeight: '10vh',
                  background: vm.deptoSeleccionado?._id === d._id ? '#f0f9ff' : '#fff',
                  borderRadius: 8,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 16,
                  cursor: 'pointer',
                  border: vm.deptoSeleccionado?._id === d._id ? '1px solid #60a5fa' : '1px solid transparent',
                }}
              >
                <div style={{ width: 88, height: 88, borderRadius: 12, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 16, flexShrink: 0, fontWeight: 700, color: '#0f172a' }}>{(d._nombre || '').charAt(0).toUpperCase()}</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>{d._nombre}</div>
                      <div style={{ fontSize: 14, color: '#6b7280', marginTop: 6 }}>{/* placeholder for description or extra info */}</div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <FloatingAddButton onPress={() => { try { localStorage.removeItem('editingDeptoId'); } catch (e) {} ; router.push('/editarDepto'); }} />
      </div>
    );
  }

  // Native rendering
  const departamentos = (vm.departamentos || []).filter(d => {
    if (!query) return true;
    return (d._nombre || '').toString().toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });

  return (
    <View style={nativeStyles.container}>
      <ActionHeader title="Listado de Departamentos" />

      <View style={nativeStyles.searchWrap}>
        <TextInput placeholder="Buscar departamentos..." value={query} onChangeText={t => setQuery(t)} style={nativeStyles.searchInput} />
      </View>

      {msg ? <View style={nativeStyles.msg}><Text style={nativeStyles.msgText}>{msg}</Text></View> : null}

      {vm.deptoSeleccionado ? (
        <View style={nativeStyles.selectedRow}>
          <View style={nativeStyles.selectedLeft}>
            <View style={nativeStyles.avatar}><Text style={nativeStyles.avatarText}>{(vm.deptoSeleccionado._nombre || '').charAt(0).toUpperCase()}</Text></View>
            <View>
              <Text style={nativeStyles.selectedName}>{vm.deptoSeleccionado._nombre}</Text>
              <Text style={nativeStyles.selectedSubtitle}>Departamento seleccionado</Text>
            </View>
          </View>
          <View style={nativeStyles.selectedActions}>
            <Pressable onPress={() => { try { localStorage.setItem('editingDeptoId', String((vm.deptoSeleccionado as any)._id)); } catch (e) {} ; router.push(`/editarDepto?id=${(vm.deptoSeleccionado as any)._id}` as any); }} style={nativeStyles.editButton}><Text style={nativeStyles.actionText}>Editar</Text></Pressable>
            <Pressable onPress={handleDelete} style={nativeStyles.deleteButton}><Text style={nativeStyles.actionText}>Borrar</Text></Pressable>
          </View>
        </View>
      ) : null}

      <ScrollView style={nativeStyles.list} contentContainerStyle={nativeStyles.listContent}>
        {departamentos.map(d => (
          <Pressable key={d._id} onPress={() => vm.seleccionarDepartamento(d)} style={[nativeStyles.card, vm.deptoSeleccionado?._id === d._id && nativeStyles.cardSelected]}>
            <View style={nativeStyles.avatar}><Text style={nativeStyles.avatarText}>{(d._nombre || '').charAt(0).toUpperCase()}</Text></View>
            <View style={nativeStyles.cardBody}>
              <Text style={nativeStyles.cardTitle}>{d._nombre}</Text>
              <Text style={nativeStyles.cardSubtitle}>{/* placeholder */}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <FloatingAddButton onPress={() => { try { localStorage.removeItem('editingDeptoId'); } catch (e) {} ; router.push('/editarDepto'); }} />
    </View>
  );
});

export default ListadoDepartamentosView;

const nativeStyles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column', paddingTop: 110, paddingBottom: 56, backgroundColor: '#f8fafc' },
  searchWrap: { padding: 12 },
  searchInput: { padding: 8, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  msg: { margin: 12, padding: 10, borderRadius: 8, backgroundColor: '#ecfdf5', borderWidth: 1, borderColor: '#bbf7d0' },
  msgText: { color: '#065f46' },
  selectedRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#f8fafc', borderBottomWidth: 1, borderBottomColor: '#e6eef8' },
  selectedLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 8, backgroundColor: '#eef2ff', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { fontWeight: '700', fontSize: 24, color: '#4338ca' },
  selectedName: { fontWeight: '700', fontSize: 16 },
  selectedSubtitle: { fontSize: 13, color: '#6b7280' },
  selectedActions: { flexDirection: 'row', gap: 8 },
  editButton: { backgroundColor: '#059669', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  deleteButton: { backgroundColor: '#ef4444', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  actionText: { color: '#fff' },
  list: { padding: 12, flex: 1 },
  listContent: { gap: 12 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 8, backgroundColor: '#fff', marginBottom: 12 },
  cardSelected: { borderWidth: 1, borderColor: '#60a5fa', backgroundColor: '#f0f9ff' },
  cardBody: { flex: 1, justifyContent: 'center' },
  cardTitle: { fontWeight: '700', fontSize: 18 },
  cardSubtitle: { fontSize: 14, color: '#6b7280', marginTop: 6 },
});
