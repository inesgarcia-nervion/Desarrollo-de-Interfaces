import { Drawer } from "expo-router/drawer";
import { Ionicons } from '@expo/vector-icons';

export default function DrawerLayout() {
    return (
        <Drawer screenOptions={{ headerShown: true }}>
            <Drawer.Screen 
                name="(tabs)" 
                options={{ 
                    drawerLabel: "Inicio", 
                    title: "Inicio",
                    drawerIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="home" 
                        size={size} 
                        color={color} />
                    ),
                }} 
            />

        {
        
            }
            <Drawer.Screen 
                name="config" 
                options={{ 
                    drawerLabel: "Configuración", 
                    title: "Configuración",
                    headerShown: true,
                    drawerIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    ),
                }} 
            />
        </Drawer>
    );
}