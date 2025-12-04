import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs 
        screenOptions={{
            headerShown : false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#f2f2f2',
                borderTopWidth: 0,
                height: 60,
            }
        }}
        >
        <Tabs.Screen
            name="index"
            options={{
                title:"Inicio",
                headerShown: false,                 // Ocultar el encabezado en la pantalla de inicio
                tabBarIcon: ({ color,size }) => (
                    <Ionicons
                    name="home"
                    size={size}
                    color={color}
                    />
                ),
            }}
        />

        <Tabs.Screen
            name="profile"
            options={{
                title:"Perfil",
                headerShown: true,  
                tabBarIcon: ({ color,size }) => (
                    <Ionicons
                    name="person"
                    size={size}
                    color={color}
                    />
                ),
            }}
        />
        
    </Tabs>
    );
}
