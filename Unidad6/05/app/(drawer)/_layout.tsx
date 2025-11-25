import { Drawer } from "expo-router/drawer";
import { Ionicons } from '@expo/vector-icons';

export default function DrawerLayout() {
    return (
        <Drawer screenOptions={{ headerShown: true }}>
        {

            }
            <Drawer.Screen 
                name="(tabs)" 
                options={{ 
                    drawerLabel: "Inicio", 
                    title: "Inicio",
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home" 
                        size={size} 
                        color={color} />
                    ),
                }} 
            />

        {
            <Drawer.Screen
                name="profile"
                options={{
                    drawerLabel: "Perfil", 
                        title: "Perfil",
                        headerShown: true, // Queremos ver la cabecera aquí porque esta pantalla no tiene Tabs
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="person" size={size} color={color} />
                        ),
            }}
        />


            }
            <Drawer.Screen 
                name="config" 
                options={{ 
                    drawerLabel: "Configuración", 
                    title: "Configuración",
                    headerShown: true, // Queremos ver la cabecera aquí porque esta pantalla no tiene Tabs
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    ),
                }} 
            />
        </Drawer>
    );
}