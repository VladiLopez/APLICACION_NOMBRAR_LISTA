
import React, { createContext, useContext, useState } from 'react';

// Creacion del contexto de la aplicacion
const AppContext = createContext();

// Componente proveedor del contexto de la aplicacion
export const AppProvider = ({ children }) => {
  // Estado para almacenar el estado de actualizacion de la aplicacion
  const [refreshToken, setRefreshToken] = useState(false);

  // Funcion para refrescar la aplicacion
  const refreshApp = () => {
    setRefreshToken((prev) => !prev);// Invierte el valor del estado para forzar una aplicacion
  };

  // Valor del contexto que contiene el estado de actualizacion y la funcion para refrescar la aplicacion
  const value = {
    refreshToken,
    refreshApp,
  };

  // Proporciona el contexto a todos los componentes hijos
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook personalizado para acceder al contexto de la aplicacion
export const useAppContext = () => {
  const context = useContext(AppContext); // Obtener el contexto de la aplicacion 

  // lanzamos un error si el contexto no esta disponible
  if (!context) {
    throw new Error('useAppContext debe ser utilizado dentro de un AppProvider');
  }

  // Devolver el contexto de la aplicacion 
  return context;
};
