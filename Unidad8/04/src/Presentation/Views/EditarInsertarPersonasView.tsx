"use client";
import React, { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";
import { runInAction, autorun } from 'mobx';
import { Platform, View, TextInput, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [dateInput, setDateInput] = useState<string>('');
  const isEditingDateRef = useRef(false);

  const styles: { [k: string]: React.CSSProperties } = {
    card: { background: '#ffffff', borderRadius: 12, padding: 28, boxShadow: '0 6px 20px rgba(16,24,40,0.08)' },
    label: { display: 'block', fontSize: 13, color: '#374151', marginBottom: 6, fontWeight: 600 },
    input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', outline: 'none' as const, boxSizing: 'border-box' as const },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
    header: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 },
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
          _fechaNacimiento: fecha ? new Date(fecha).toISOString() : '',
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

  useEffect(() => {
    const disp = autorun(() => {
      const iso = vm.persona && (vm.persona._fechaNacimiento as string) ? (vm.persona._fechaNacimiento as string) : '';
      // do not override the UI while the user is actively editing the date
      if (isEditingDateRef.current) return;
      if (!iso) {
        setDateInput('');
        return;
      }
      try {
        const d = new Date(iso);
        if (!isNaN(d.getTime())) {
          const dd = String(d.getDate()).padStart(2, '0');
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const yyyy = String(d.getFullYear());
          // display two-digit year for Spain format
          setDateInput(`${dd}/${mm}/${yyyy.slice(-2)}`);
          return;
        }
      } catch (e) {
        // fallthrough
      }
      // fallback: show raw slice if parsing failed
      setDateInput(iso.slice(0,10));
    });
    return () => disp();
  }, []);

  // Shared parser: accepts DD/MM/AA or DD/MM/AAAA or ISO-like strings or loose parse.
  const parseAndApplyDate = (raw: string) => {
    const t = (raw || '').trim();
    console.debug('[parseAndApplyDate] raw=', raw, 'trimmed=', t);
    if (t === '') {
      runInAction(() => {
        vm.persona._fechaNacimiento = '';
        vm.persona._edad = 0;
      });
      return false;
    }
    const dm = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/;
    const isoLike = /^\d{4}-\d{2}-\d{2}$/;
    try {
      let parsedDate: Date | null = null;
      const m = t.match(dm);
      if (m) {
        const day = Number(m[1]);
        const month = Number(m[2]);
        let year = Number(m[3]);
        if (String(m[3]).length === 2) {
          const curYY = new Date().getFullYear() % 100;
          year = year <= curYY ? 2000 + year : 1900 + year;
        }
        const candidate = new Date(year, month - 1, day);
        if (!isNaN(candidate.getTime()) && candidate.getDate() === day && (candidate.getMonth() + 1) === month && candidate.getFullYear() === year) {
          parsedDate = candidate;
        }
      } else if (isoLike.test(t)) {
        const candidate = new Date(t);
        if (!isNaN(candidate.getTime())) parsedDate = candidate;
      } else {
        const candidate = new Date(t);
        if (!isNaN(candidate.getTime())) parsedDate = candidate;
      }

      if (parsedDate) {
        runInAction(() => {
          vm.persona._fechaNacimiento = parsedDate!.toISOString();
          const now = new Date();
          let years = now.getFullYear() - parsedDate!.getFullYear();
          const mm2 = now.getMonth() - parsedDate!.getMonth();
          if (mm2 < 0 || (mm2 === 0 && now.getDate() < parsedDate!.getDate())) years--;
          vm.persona._edad = years;
        });
        const dd = String(parsedDate.getDate()).padStart(2, '0');
        const mm3 = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const yyyy3 = String(parsedDate.getFullYear());
        // store display with two-digit year for UX
        setDateInput(`${dd}/${mm3}/${yyyy3.slice(-2)}`);
        return true;
      }
    } catch (err) {
      // ignore
    }
    return false;
  };

  const isEditing = Boolean(vm.persona && vm.persona._id && Number(vm.persona._id) > 0);

  if (Platform.OS === 'web') {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 18 }}>
        <form
          style={styles.card}
          onSubmit={async e => {
            e.preventDefault();
              try {
                // ensure any typed date is parsed/applied before saving
                parseAndApplyDate(dateInput);
                await vm.guardar();
                // After saving, navigate to the personas list
                router.push("/personas");
              } catch (err: any) {
                console.error('[EditarView] guardar error', err);
                setErrMsg(err?.message ?? String(err));
              }
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
              <input style={styles.input} placeholder="Nombre" value={vm.persona._nombre || ""} onChange={e => runInAction(() => { vm.persona._nombre = e.target.value; })} />
            </div>

            <div>
              <label style={styles.label}>Apellidos</label>
              <input style={styles.input} placeholder="Apellidos" value={vm.persona._apellidos || ""} onChange={e => runInAction(() => { vm.persona._apellidos = e.target.value; })} />
            </div>

            <div>
              <label style={styles.label}>Edad</label>
              <input style={{ ...styles.input, background: '#f8fafc' }} type="number" placeholder="Edad" value={vm.persona._edad || 0} readOnly disabled />
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>Edad calculada a partir de la Fecha de nacimiento</div>
            </div>

            <div>
              <label style={styles.label}>Fecha de nacimiento</label>
              <input
                style={styles.input}
                placeholder="DD/MM/AA"
                value={dateInput}
                onChange={e => setDateInput(e.target.value)}
                onBlur={() => {
                  const t = dateInput.trim();
                  if (t === '') {
                    runInAction(() => {
                      vm.persona._fechaNacimiento = '';
                      vm.persona._edad = 0;
                    });
                    return;
                  }
                  const dm = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/;
                  const isoLike = /^\d{4}-\d{2}-\d{2}$/;
                  try {
                    let parsedDate: Date | null = null;
                    const m = t.match(dm);
                    if (m) {
                      const day = Number(m[1]);
                      const month = Number(m[2]);
                      let year = Number(m[3]);
                      if (String(m[3]).length === 2) {
                        const curYY = new Date().getFullYear() % 100;
                        year = year <= curYY ? 2000 + year : 1900 + year;
                      }
                      const candidate = new Date(year, month - 1, day);
                      if (!isNaN(candidate.getTime()) && candidate.getDate() === day && (candidate.getMonth() + 1) === month && candidate.getFullYear() === year) {
                        parsedDate = candidate;
                      }
                    } else if (isoLike.test(t)) {
                      const candidate = new Date(t);
                      if (!isNaN(candidate.getTime())) parsedDate = candidate;
                    } else {
                      const candidate = new Date(t);
                      if (!isNaN(candidate.getTime())) parsedDate = candidate;
                    }

                    if (parsedDate) {
                      runInAction(() => {
                        vm.persona._fechaNacimiento = parsedDate!.toISOString();
                        const now = new Date();
                        let years = now.getFullYear() - parsedDate!.getFullYear();
                        const mm2 = now.getMonth() - parsedDate!.getMonth();
                        if (mm2 < 0 || (mm2 === 0 && now.getDate() < parsedDate!.getDate())) years--;
                        vm.persona._edad = years;
                      });
                      const dd = String(parsedDate.getDate()).padStart(2, '0');
                      const mm3 = String(parsedDate.getMonth() + 1).padStart(2, '0');
                      const yyyy3 = String(parsedDate.getFullYear());
                      // display two-digit year
                      setDateInput(`${dd}/${mm3}/${yyyy3.slice(-2)}`);
                    } else {
                      // leave input for correction
                    }
                  } catch (err) {
                    // keep input
                  }
                }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={styles.label}>Dirección</label>
              <input style={styles.input} placeholder="Dirección" value={vm.persona._direccion || ""} onChange={e => runInAction(() => { vm.persona._direccion = e.target.value; })} />
            </div>

            <div>
              <label style={styles.label}>Teléfono</label>
              <input style={styles.input} placeholder="Teléfono" value={vm.persona._telefono || ""} onChange={e => runInAction(() => { vm.persona._telefono = e.target.value; })} />
            </div>

            <div>
              <label style={styles.label}>Departamento</label>
              <select style={styles.input} value={vm.persona._idDepartamento || ""} onChange={e => runInAction(() => { vm.persona._idDepartamento = Number(e.target.value); })}>
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
              <input style={styles.input} placeholder="URL de foto" value={vm.persona._foto || ""} onChange={e => runInAction(() => { vm.persona._foto = e.target.value; })} />
              {vm.persona._foto ? (<img src={(vm.persona._foto as string)} alt="foto" style={{ width: 120, height: 120, borderRadius: 8, objectFit: 'cover', marginTop: 8 }} />) : null}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 16 }}>
            <button type="button" onClick={() => router.push('/personas')} style={styles.ghostBtn}>
              Cancelar
            </button>
            <button type="submit" style={styles.primaryBtn}>
              {isEditing ? 'Guardar' : 'Crear'}
            </button>
          </div>
          {errMsg ? <div style={{ marginTop: 12, color: '#b91c1c' }}>{errMsg}</div> : null}
        </form>
      </div>
    );
  }

  // Native rendering (minimal, avoids web-only tags)
  return (
    <ScrollView contentContainerStyle={nativeStyles.container}>
      <View style={nativeStyles.header}>
        {vm.persona._foto ? (
          <Image source={{ uri: vm.persona._foto as string }} style={nativeStyles.avatar} />
        ) : (
          <View style={[nativeStyles.avatar, nativeStyles.avatarPlaceholder]} />
        )}
        <View style={{ flex: 1 }}>
          <Text style={nativeStyles.title}>{isEditing ? 'Editar persona' : 'Crear persona'}</Text>
          <Text style={nativeStyles.subtitle}>{isEditing ? `${vm.persona._nombre || '—'} ${vm.persona._apellidos || ''}` : 'Crear nueva persona'}</Text>
        </View>
      </View>

      <View style={nativeStyles.formRow}>
        <Text style={nativeStyles.label}>Nombre</Text>
        <TextInput style={nativeStyles.input} value={vm.persona._nombre || ''} onChangeText={t => runInAction(() => { vm.persona._nombre = t; })} />
      </View>

      <View style={nativeStyles.formRow}>
        <Text style={nativeStyles.label}>Apellidos</Text>
        <TextInput style={nativeStyles.input} value={vm.persona._apellidos || ''} onChangeText={t => runInAction(() => { vm.persona._apellidos = t; })} />
      </View>

      <View style={nativeStyles.formRow}>
        <Text style={nativeStyles.label}>Teléfono</Text>
        <TextInput style={nativeStyles.input} value={vm.persona._telefono || ''} onChangeText={t => runInAction(() => { vm.persona._telefono = t; })} />
      </View>

      <View style={nativeStyles.formRow}>
        <Text style={nativeStyles.label}>Dirección</Text>
        <TextInput style={nativeStyles.input} value={vm.persona._direccion || ''} onChangeText={t => runInAction(() => { vm.persona._direccion = t; })} />
      </View>

      <View style={nativeStyles.formRow}>
        <Text style={nativeStyles.label}>Fecha de nacimiento</Text>
        <Text style={nativeStyles.formatHint}>Formato: DD/MM/AA (ej. 31/12/90)</Text>
        <TextInput
          style={nativeStyles.input}
          placeholder="DD/MM/AA"
          value={dateInput}
          keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'visible-password'}
          autoCorrect={false}
          maxLength={8}
          onFocus={() => { isEditingDateRef.current = true; }}
          onBlur={() => { isEditingDateRef.current = false; parseAndApplyDate(dateInput); }}
          onChangeText={t => {
            // update local input only while typing to avoid aggressive reformatting
            setDateInput(t);
          }}
          onEndEditing={() => {
            const t = dateInput.trim();
            if (t === '') {
              runInAction(() => {
                vm.persona._fechaNacimiento = '';
                vm.persona._edad = 0;
              });
              return;
            }
            // Spanish formats: DD/MM/AA or DD/MM/AAAA
            const dm = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/;
            const isoLike = /^\d{4}-\d{2}-\d{2}$/;
            try {
              let parsedDate: Date | null = null;
              const m = t.match(dm);
              if (m) {
                const day = Number(m[1]);
                const month = Number(m[2]);
                let year = Number(m[3]);
                if (String(m[3]).length === 2) {
                  const curYY = new Date().getFullYear() % 100;
                  year = year <= curYY ? 2000 + year : 1900 + year;
                }
                const candidate = new Date(year, month - 1, day);
                if (!isNaN(candidate.getTime()) && candidate.getDate() === day && (candidate.getMonth() + 1) === month && candidate.getFullYear() === year) {
                  parsedDate = candidate;
                }
              } else if (isoLike.test(t)) {
                const candidate = new Date(t);
                if (!isNaN(candidate.getTime())) parsedDate = candidate;
              } else {
                // try Date auto-parse as last resort
                const candidate = new Date(t);
                if (!isNaN(candidate.getTime())) parsedDate = candidate;
              }

              if (parsedDate) {
                runInAction(() => {
                  vm.persona._fechaNacimiento = parsedDate!.toISOString();
                  const now = new Date();
                  let years = now.getFullYear() - parsedDate!.getFullYear();
                  const mm2 = now.getMonth() - parsedDate!.getMonth();
                  if (mm2 < 0 || (mm2 === 0 && now.getDate() < parsedDate!.getDate())) years--;
                  vm.persona._edad = years;
                });
                // normalize display to DD/MM/YY (two-digit year)
                const dd = String(parsedDate.getDate()).padStart(2, '0');
                const mm3 = String(parsedDate.getMonth() + 1).padStart(2, '0');
                const yyyy3 = String(parsedDate.getFullYear());
                setDateInput(`${dd}/${mm3}/${yyyy3.slice(-2)}`);
              } else {
                // keep local input for user correction
              }
            } catch (err) {
              // keep local input
            }
          }}
        />
        <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>debug: {dateInput || 'empty'} — {String(vm.persona._fechaNacimiento || '')}</Text>
      </View>

      <View style={nativeStyles.formRow}>
        <Text style={nativeStyles.label}>Edad</Text>
        <Text style={{ padding: 10 }}>{vm.persona._edad ?? ''} {vm.persona._edad ? 'años' : ''}</Text>
        <Text style={nativeStyles.subtitle}>Edad calculada a partir de la Fecha de nacimiento</Text>
      </View>

      <View style={nativeStyles.formRow}>
        <Text style={nativeStyles.label}>Departamento</Text>
        <View style={nativeStyles.pickerWrap}>
          <Picker
            selectedValue={vm.persona._idDepartamento ?? ''}
            onValueChange={v => runInAction(() => { vm.persona._idDepartamento = Number(v); })}
            mode="dropdown"
          >
            <Picker.Item label="Seleccione Departamento" value={''} />
            {vm.departamentos.map(d => (
              <Picker.Item key={(d as any)._id ?? (d as any).id} label={(d as any)._nombre ?? (d as any).nombre} value={(d as any)._id ?? (d as any).id} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={nativeStyles.formRow}>
        <Text style={nativeStyles.label}>URL de foto</Text>
        <TextInput style={nativeStyles.input} value={vm.persona._foto || ''} onChangeText={t => runInAction(() => { vm.persona._foto = t; })} />
        {vm.persona._foto ? <Image source={{ uri: vm.persona._foto as string }} style={nativeStyles.imagePreview} /> : null}
      </View>

      <View style={nativeStyles.actions}>
        <Pressable hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }} onPress={() => router.push('/personas')} style={nativeStyles.ghostBtn}><Text>Cancelar</Text></Pressable>
        <Pressable hitSlop={{ top: 12, left: 12, right: 12, bottom: 12 }} onPress={async () => {
            try {
              // ensure any typed date is parsed/applied before saving
              parseAndApplyDate(dateInput);
              await vm.guardar();
              router.push('/personas');
            } catch (err: any) {
              console.error('[EditarView native] guardar error', err);
              setErrMsg(err?.message ?? String(err));
            }
          }} style={nativeStyles.primaryBtn}><Text style={{ color: '#fff' }}>{isEditing ? 'Guardar' : 'Crear'}</Text></Pressable>
      </View>
      {errMsg ? <View style={{ marginTop: 12 }}><Text style={{ color: '#b91c1c' }}>{errMsg}</Text></View> : null}
    </ScrollView>
  );
}

export default observer(EditarInsertarPersonasView);

const nativeStyles = StyleSheet.create({
  container: { padding: 16, paddingTop: 110, backgroundColor: '#f8fafc', paddingBottom: 56 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  avatar: { width: 64, height: 64, borderRadius: 64, backgroundColor: '#f3f4f6', marginRight: 16 },
  avatarPlaceholder: { backgroundColor: '#e5e7eb' },
  title: { fontSize: 20, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 13, color: '#6b7280', marginTop: 4 },
  formRow: { marginBottom: 12 },
  label: { fontSize: 13, color: '#374151', marginBottom: 6 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 12 },
  ghostBtn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: 'transparent', marginRight: 8 },
  primaryBtn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#059669' },
  pickerWrap: { backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#e5e7eb' },
  imagePreview: { width: 120, height: 120, borderRadius: 8, marginTop: 12, alignSelf: 'flex-start' }
  ,formatHint: { fontSize: 12, color: '#6b7280', marginBottom: 6 }
});

