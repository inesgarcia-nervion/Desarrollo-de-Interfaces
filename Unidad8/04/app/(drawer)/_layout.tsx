import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        {/* Pantallas que SÍ se ven en el menú */}
        <Drawer.Screen name="index" options={{ drawerLabel: "Inicio", title: "Inicio" }} />
        <Drawer.Screen name="personas" options={{ drawerLabel: "Personas", title: "Listado Personas" }} />
        <Drawer.Screen name="departamento" options={{ drawerLabel: "Departamentos", title: "Listado Deptos" }} />

        {/* Pantallas que están DENTRO pero SE OCULTAN del menú lateral */}
        <Drawer.Screen 
            name="editarPersona" 
            options={{ 
                drawerItemStyle: { display: 'none' }, // Esto hace que no salga el botón
                title: "Datos Persona" 
            }} 
        />
        <Drawer.Screen 
            name="editarDepto" 
            options={{ 
                drawerItemStyle: { display: 'none' }, 
                title: "Datos Departamento" 
            }} 
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}