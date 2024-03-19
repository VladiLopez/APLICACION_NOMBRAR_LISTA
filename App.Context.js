// Importación de los componentes desde React Native
import React, { createContext, useContext, useState } from 'react';

// Creación del contexto de la aplicación
const AppContext = createContext();

// Proveedor de contexto de la aplicación
export const AppProvider = ({ children }) => {
  // Estado local para almacenar el estado de actualización de la aplicación
  const [refreshToken, setRefreshToken] = useState(false);

  // Función para actualizar el estado de actualización de la aplicación
  const refreshApp = () => {
    setRefreshToken((prev) => !prev);
  };

  // valor del contexto que incluye el estado y la función de actualización
  const value = {
    refreshToken,
    refreshApp,
  };

  // Retorno del proveedor de contexto con el valor proporcionado
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook personalizado para acceder al contexto de la aplicación
export const useAppContext = () => {
  const context = useContext(AppContext);

  // Manejo de errores si el hook se utiliza fuera del proveedor de contexto
  if (!context) {
    throw new Error('useAppContext debe ser utilizado dentro de un AppProvider');
  }

  // Exportamos el componente para que sea utilizado en otras partes de la aplicación
  return context;
};
