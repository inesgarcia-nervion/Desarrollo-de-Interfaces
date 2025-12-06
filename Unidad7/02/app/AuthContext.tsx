import React, { createContext, useState, ReactNode } from 'react';

// Definimos qué tipo de datos vamos a guardar (Contrato) 
// Es para avisar que en mi contexto SIEMPRE habrá 4 cosas: un booleano, un string y dos funciones. Si falta algo, avísame con un error rojo".
type AuthContextType = {
  isLoggedIn: boolean;
  userName: string;
  loginUser: (name: string) => void;
  logoutUser: () => void;
};


// Creamos el objeto del Contexto
export const AuthContext = createContext<AuthContextType>(null!);


// Creamos el Proveedor (la "nube" que envuelve la app)
export const AuthProvider = ({ children }: { children: ReactNode }) => {

  // HOOK: useState maneja la memoria de si estamos logueados o no
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const loginUser = (name: string) => {
    setUserName(name);        // Guardamos el nombre que nos pasan
    setIsLoggedIn(true);      // Cambiamos el estado a "logueado"
  };

  const logoutUser = () => {
    setUserName('');          // Borramos el nombre
    setIsLoggedIn(false);     // Ponemos el estado en "Desconectado"
  };


  return (
    // Provider: componente que emite la señal.
    // Aquí metemos las 4 cosas que prometimos en el contrato
    <AuthContext.Provider value={{ isLoggedIn, userName, loginUser, logoutUser }}>      
      {children}
    </AuthContext.Provider>
  );
};