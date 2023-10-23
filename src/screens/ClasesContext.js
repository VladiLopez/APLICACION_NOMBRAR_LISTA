import React, { createContext, useState, useContext } from "react";

const ClasesContext = createContext();

export const ClasesProvider = ({ children }) => {
  const [clases, setClases] = useState([]);

  return (
    <ClasesContext.Provider value={{ clases, setClases }}>
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
