/**
 * Este archivo define el contexto para gestionar el 
 * estado de la aplicacion React Native.
 * Proporciona funciones para actualizar el estado de
 * la aplicacion y un hook personalizado para consumir el
 * contexto en componentes hijos.
 */
import React, { createContext, useContext, useState } from 'react';

/**
 * Proveedor de contexto para gestionar el estado de la aplicacion
 */
const AppContext = createContext();

/**
 * Proveedor de contexto para el estado de la aplicacion.
 * Este proveedor utiliza el contexto creado para 
 * gestionar el estado de la aplicacion y proporcionarlo 
 * a los componentes hijos.
 * @param { object } props - Propiedades del componente. 
 * @param { ReactNode } props.children - Componentes 
 * hijos que consumiran el contexto.
 */
export const AppProvider = ({ children }) => {
  //Estado local para almacenar el token de actualizacion de la aplicacion
  const [refreshToken, setRefreshToken] = useState(false);

  /**
   * Actualiza el estado de la aplicacion al invertir
   * el valor del token de actualizacion.
   */
  const refreshApp = () => {
    setRefreshToken((prev) => !prev);
  };

  // Contexto que se proporcionara a los componentes hijos
  const value = {
    refreshToken,
    refreshApp,
  };

  // Renderizamos el componente
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

/**
 * Hook personalizado para consumir el contexto de la 
 * aplicacion.
 * Este hook facilita el acceso al estado de la 
 * aplicacion y las funciones para actualizarlo en los
 * componentes que lo utilizaran.
 * @returns { object } - Contexto de la aplicacion que 
 * contiene el estado y las funciones para actualizarlo.
 * @throws { Error } - Si se intenta utilizar fuera de un 
 * AppProvider.
 */
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext debe ser utilizado dentro de un AppProvider');
  }

  return context;
};
