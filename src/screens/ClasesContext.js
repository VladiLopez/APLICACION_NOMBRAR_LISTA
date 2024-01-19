// Importamos librerías y componentes necesarios

import React, { createContext, useContext, useState } from "react";

/**
 * Contexto de Clases.
 * 
 * @description Este contexto proporciona un estado global para la gestion de clases en la aplicación.
 */
const ClasesContext = createContext();

/**
 * Proveedor de Clases.
 * 
 * @description Este proveedor utiliza el contexto de Clases para proporcionar un estado global
 * y funciones relacionadas con la gestion de clases a los componentes secundarios.
 * 
 * @param {Object} children - Componentes secundarios que deben tener acceso al contexto.
 * @returns {JSX.Element} Elemento JSX que envuelve los componentes secundarios con el contexto de Clases.
 */

export const ClasesProvider = ({ children }) => {
  // Estado local para almacenar la lista de clases
  const [clases, setClases] = useState([]);
  /**
   * Funcion para agregar una nueva clase al estado global
   * 
   * @param {Object} nuevaClase - Objeto que representa la nueva clase a agregar.
   */

  const agregarClase = (nuevaClase) => {
    setClases([...clases, { id: clases.length, ...nuevaClase }]);
  };

  // Valor que se proporciona a través del contexto
  const value = {
    clases,
    setClases,
    agregarClase,
  };

  // Renderiza el proveedor del contexto con los componentes secundarios
  return (
    <ClasesContext.Provider value={value}>
      {children}
    </ClasesContext.Provider>
  );
};

/**
 * Hook useClases.
 * 
 * @description Este hook proporciona acceso al contexto de Clases en los componentes secundarios.
 * 
 * @returns {Object} Contexto de Clases que contiene el estado global y funciones relacionadas con las clases.
 * @throws {Error} Se lanza un error si el hook se utiliza fuera de un ClasesProvider.
 */
export const useClases = () => {
  // Obtiene el contexto de Clases
  const context = useContext(ClasesContext);
  
  // Comprobamos si el contexto esta presente
  if (!context) {
    throw new Error("useClases debe ser utilizado dentro de un ClasesProvider");
  }

  // Retornamos el contexto
  return context;
};
