import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Pressable, ScrollView } from "react-native";
import { Slot, useRouter, usePathname } from "expo-router";
import Svg, { Rect, Path, Circle } from "react-native-svg";

export default function DrawerLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (path: string) => {
    setIsOpen(false);
    router.push(path as any);
  };

  const drawerWidth = 300;

  return (
    <View style={{ flex: 1 }}>
      {/* Backdrop */}
      {isOpen && (
        <Pressable
          style={styles.backdrop}
          onPress={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <View
        style={[
          styles.drawerBase,
          {
            transform: [{ translateX: isOpen ? 0 : -drawerWidth }],
            opacity: isOpen ? 1 : 0,
          },
        ]}
      >
        <ScrollView style={{ flex: 1 }}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.logo}>
              <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <Rect width="24" height="24" rx="6" fill="#06b6d4" />
                <Path
                  d="M7 12h10M7 8h10M7 16h6"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
              <View>
                <Text style={styles.logoTitle}>App Demo</Text>
                <Text style={styles.logoSubtitle}>Navegación</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setIsOpen(false)}
            >
              <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <Path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="#0f172a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>

          {/* Navigation */}
          <View style={styles.nav}>
            {[
              { href: "/", label: "Inicio" },
              { href: "/personas", label: "Personas" },
              { href: "/departamento", label: "Departamentos" },
            ].map((item) => {
              const active = pathname === item.href;
              return (
                <TouchableOpacity
                  key={item.href}
                  onPress={() => navigate(item.href)}
                  style={[styles.navLink, active && styles.navLinkActive]}
                >
                  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <Circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke={active ? "#4338ca" : "#94a3b8"}
                      strokeWidth="1.2"
                    />
                    <Path
                      d="M8 12h8"
                      stroke={active ? "#4338ca" : "#94a3b8"}
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </Svg>
                  <Text style={[styles.navText, active && styles.navTextActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Versión 1.0 • Soporte</Text>
          </View>
        </ScrollView>
      </View>

      {/* Main content */}
      <View style={{ flex: 1 }}>
        {/* Menu toggle button */}
        {!isOpen && (
          <TouchableOpacity
            onPress={() => setIsOpen(true)}
            style={styles.menuButton}
          >
            <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <Rect x="3" y="6" width="18" height="2" rx="1" fill="#fff" />
              <Rect x="3" y="11" width="18" height="2" rx="1" fill="#fff" />
              <Rect x="3" y="16" width="18" height="2" rx="1" fill="#fff" />
            </Svg>
          </TouchableOpacity>
        )}
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(2, 6, 23, 0.35)",
    zIndex: 2500,
  },
  drawerBase: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "#ffffff",
    padding: 18,
    paddingTop: 48,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
    zIndex: 3000,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
  },
  logoSubtitle: {
    fontSize: 12,
    color: "#475569",
  },
  closeBtn: {
    padding: 6,
  },
  nav: {
    marginTop: 8,
    gap: 6,
  },
  navLink: {
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  navLinkActive: {
    backgroundColor: "#eef2ff",
  },
  navText: {
    color: "#0f172a",
    fontSize: 14,
  },
  navTextActive: {
    color: "#4338ca",
    fontWeight: "600",
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#475569",
  },
  menuButton: {
    position: "absolute",
    top: 48,
    left: 12,
    width: 40,
    height: 40,
    backgroundColor: "#06b6d4",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
});