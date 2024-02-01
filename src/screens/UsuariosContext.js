/**
 * Usuario.js
 * Este archivo define el contexto y el proveedor de 
 * contexto para gestionar el estado del usuario en la
 * aplicacion React Native.
 * Proporciona funciones para establecer y obtener el 
 * codigo de usuario, asi como un hook personalizado 
 * para consumir el contexto del usuario en componentes
 * hijos.
 */

import React, { createContext, useContext, useState } from "react";

// Crear un contexto para gestionar el estado del usuario
const UsuarioContext = createContext();

/**
 * Proveedor de contexto para el estado del usuario.
 * Este proveedor utiliza el contexto creado para gestionar
 * el estado del código de usuario y proporcionarlo a
 * los componentes hijos.
 * @param { object } props - Propiedades del componente. 
 * @param { ReactNode } props.children - Componentes hijos
 * que consumiran el contexto.
 */
export const UsuarioProvider = ({ children }) => {
  // Estado local para almacenar el código de usuario
  const [codigoUsuario, setCodigoUsuario] = useState(null);

  /**
   * Establece el codigo de usuario.
   * @param { string } codigo - Codigo de usuario que se establecera.
   */
  const getCodigo = (codigo) => {
    setCodigoUsuario(codigo);
  };

  // Contexto que se proporcionara a los componentes hijos
  const value = {
    codigoUsuario,
    getCodigo,
  };

  // Renderizar el componente
  return (
    <UsuarioContext.Provider value={value}>
      {children}
    </UsuarioContext.Provider>
  );
};

/**
 * Hook personalizado para consumir el contexto del usuario.
 * Este hook facilita el acceso al estado del codigo de
 * usuario en los componentes que lo utilizan.
 * @returns { object } - Contexto del usuario que contiene
 * el estado y las funciones para actualizarlo.
 * @throws { Error } - Si se intenta utilizar fuera de un 
 * UsuarioProvider.
 */
export const useUsuario = () => {
  const context = useContext(UsuarioContext);

  if (!context) {
    throw new Error("useUsuario debe ser utilizado dentro de un UsuarioProvider");
  }

  return context;
};


