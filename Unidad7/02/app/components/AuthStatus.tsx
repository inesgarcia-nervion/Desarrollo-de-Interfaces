import React, { useContext } from 'react'; // 1. Importamos el Hook
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../AuthContext';

const AuthStatus = () => {
  // AQUÍ ESTÁ EL HOOK: useContext
  // Le pedimos a React que nos dé los datos de AuthContext
const { isLoggedIn, userName, loginUser, logoutUser } = useContext(AuthContext);

return (
    <View style={styles.container}>

        {/* Texto de Encabezado: Cambia según el estado */}
        <Text style={styles.headerText}>
            {isLoggedIn ? "Conectado" : "Desconectado"}
        </Text>

        {/* Nombre de Usuario: Solo se ve si está conectado */}
        {isLoggedIn && (
            <Text style={styles.userText}>Usuario: {userName}</Text>
        )}

        {/* Botón Dinámico: Cambia texto, color y acción */}
        <View style={{ marginTop: 20 }}>
            <Button
                title={isLoggedIn ? "Cerrar Sesión" : "Iniciar Sesión"}
                color={isLoggedIn ? 'red' : 'green'} // Rojo si sale, Verde si entra
                onPress={
                    isLoggedIn 
                        ? logoutUser    // Cuando el usuario pulse el botón de logout, llamamos a logoutUser
                        : () => loginUser('Inés') // Cuando el usuario pulse el botón de login, le pasamos el nombre "Inés"
                }
            />
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    userText: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default AuthStatus;