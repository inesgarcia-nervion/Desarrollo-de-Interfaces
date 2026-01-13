"use client";
import { useState } from "react";
import { Slot, useRouter } from "expo-router";

export default function DrawerLayout() {
  // start closed; show drawer when user taps the menu icon
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navigate = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    // expo-router has a narrow type for push; cast to any for dynamic paths
    router.push(path as any);
  };

  const drawerWidth = 260;

  const drawerVisibleStyle: React.CSSProperties = isOpen
    ? {
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: drawerWidth,
        background: '#f3f4f6',
        padding: 12,
        boxShadow: '2px 0 6px rgba(0,0,0,0.08)',
        transform: 'translateX(0)',
        opacity: 1,
        visibility: 'visible',
        pointerEvents: 'auto' as const,
        transition: 'transform 200ms ease-in-out, opacity 200ms ease-in-out',
        zIndex: 3000,
      }
    : {
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: drawerWidth,
        background: '#f3f4f6',
        padding: 12,
        boxShadow: '2px 0 6px rgba(0,0,0,0.08)',
        transform: `translateX(-120%)`,
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none' as const,
        transition: 'transform 200ms ease-in-out, opacity 200ms ease-in-out',
        zIndex: 3000,
      };

  return (
    <div style={{ display: 'flex' }}>
      <div style={drawerVisibleStyle} aria-hidden={!isOpen}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <strong>Inicio</strong>
          <button onClick={() => setIsOpen(false)}>Cerrar</button>
        </div>
        <div style={{ fontSize: 12, margin: 8 }}>Ruta actual: {typeof window !== 'undefined' ? window.location.pathname : ''}</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="/" onClick={(e) => navigate('/', e)}>Inicio</a>
          <a href="/personas" onClick={(e) => navigate('/personas', e)}>Personas</a>
          <a href="/departamento" onClick={(e) => navigate('/departamento', e)}>Departamentos</a>
        </nav>
      </div>
      <div
        style={{
          flex: 1,
          transform: isOpen ? `translateX(${drawerWidth}px)` : 'translateX(0px)',
          transition: 'transform 200ms ease-in-out',
          zIndex: 100,
        }}
      >
        {/* Menu toggle icon (hamburger) - visible when drawer is closed */}
        {!isOpen && (
          <button
            aria-label="Abrir menú"
            onClick={() => setIsOpen(true)}
            style={{
              position: 'fixed',
              top: 12,
              left: 12,
              width: 40,
              height: 40,
              background: '#06b6d4',
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3100,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="2" rx="1" fill="#fff" />
              <rect x="3" y="11" width="18" height="2" rx="1" fill="#fff" />
              <rect x="3" y="16" width="18" height="2" rx="1" fill="#fff" />
            </svg>
          </button>
        )}
        <Slot />
      </div>
    </div>
  );
}
