/**
 * Importamos las librerías y los componentes que hemos creado para poder desplegar los elementos visuales
 */
import React, { createContext, useState, useContext } from "react";

// Creamos un nuevo contexto de clases
const ClasesContext = createContext();

// Creamos un proveedor de contexto para manejar el estado de las clases
export const ClasesProvider = ({ children }) => {
  // Definimos el estado inicial de las clases como un array vacío
  const [clases, setClases] = useState([]);

  // Renderizamos los componentes para que puedan visualizarse
  return (
    // Proporcionamos el valor del contexto, que incluye el estado de las clases y la función para actualizarlo
    <ClasesContext.Provider value={{ clases, setClases }}>
      {children}
    </ClasesContext.Provider>
  );
};

// Creamos un hook personalizado para acceder al contexto de las clases
export const useClases = () => {
  // Obtenemos el contexto de las clases utilizando el hook useContext
  const context = useContext(ClasesContext);
  // Si el contexto no esta disponible, lanzamos un error
  if (!context) {
    throw new Error("useClases debe ser utilizado dentro de un ClasesProvider");
  }
  // Devolvemos el contexto
  return context;
};
