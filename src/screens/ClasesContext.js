import React, { createContext, useState, useContext } from "react";

const ClasesContext = createContext();

export const ClasesProvider = ({ children }) => {
  const [clases, setClases] = useState([]);

  const agregarClase = (nuevaClase) => {
    setClases([...clases, { id: clases.length, ...nuevaClase }]);
  };

  const value = {
    clases,
    setClases,
    agregarClase,
  };

  return (
    <ClasesContext.Provider value={value}>
      {children}
    </ClasesContext.Provider>
  );
};

export const useClases = () => {
  const context = useContext(ClasesContext);
  if (!context) {
    throw new Error("useClases debe ser utilizado dentro de un ClasesProvider");
  }
  return context;
};
