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

  const drawerWidth = 300;

  const styles: { [k: string]: React.CSSProperties } = {
    drawerBase: {
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      width: drawerWidth,
      background: 'linear-gradient(180deg,#ffffff,#f8fafc)',
      padding: 18,
      boxShadow: '2px 0 20px rgba(2,6,23,0.08)',
      transform: isOpen ? 'translateX(0)' : 'translateX(-120%)',
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden',
      pointerEvents: isOpen ? 'auto' as const : 'none' as const,
      transition: 'transform 240ms cubic-bezier(.2,.9,.3,1), opacity 160ms ease-in-out',
      zIndex: 3000,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    },
    headerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    logo: { display: 'flex', alignItems: 'center', gap: 10 },
    nav: { display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 },
    navLink: { padding: '10px 12px', borderRadius: 8, color: '#0f172a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 },
    navLinkActive: { background: '#eef2ff', color: '#4338ca' },
    closeBtn: { background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 },
    backdrop: { position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.35)', zIndex: 2500, opacity: isOpen ? 1 : 0, visibility: isOpen ? 'visible' : 'hidden', transition: 'opacity 180ms ease-in-out' },
    footer: { marginTop: 'auto', fontSize: 12, color: '#475569' }
  };

  return (
    <div style={{ display: 'flex' }}>

      <div style={styles.drawerBase} aria-hidden={!isOpen}>
        <div style={styles.headerRow}>
          <div style={styles.logo}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#06b6d4"/><path d="M7 12h10M7 8h10M7 16h6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div>
              <strong style={{ fontSize: 16, display: 'block', color: '#0f172a' }}>App Demo</strong>
              <div style={{ fontSize: 12, color: '#475569' }}>Navegación</div>
            </div>
          </div>
          <button style={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Cerrar drawer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M6 18L18 6" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <nav style={styles.nav}>
          {[
            { href: '/', label: 'Inicio' },
            { href: '/personas', label: 'Personas' },
            { href: '/departamento', label: 'Departamentos' },
          ].map(i => {
            const active = typeof window !== 'undefined' && window.location.pathname === i.href;
            return (
              <a key={i.href} href={i.href} onClick={(e) => navigate(i.href, e)} style={{ ...styles.navLink, ...(active ? styles.navLinkActive : {}) }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke={active ? '#4338ca' : '#94a3b8'} strokeWidth="1.2"/><path d="M8 12h8" stroke={active ? '#4338ca' : '#94a3b8'} strokeWidth="1.6" strokeLinecap="round"/></svg>
                <span>{i.label}</span>
              </a>
            );
          })}
        </nav>

        <div style={styles.footer}>Versión 1.0 • Soporte</div>
      </div>

      <div
        style={{
          flex: 1,
          transform: isOpen ? `translateX(${drawerWidth}px)` : 'translateX(0px)',
          transition: 'transform 200ms ease-in-out',
          paddingLeft: 64,
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
              zIndex: 120,
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
