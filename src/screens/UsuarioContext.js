// usuario.js

import React, { createContext, useContext, useState } from "react";

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [codigoUsuario, setCodigoUsuario] = useState(null);

  const getCodigo = (codigo) => {
    setCodigoUsuario(codigo);
  };

  const value = {
    codigoUsuario,
    getCodigo,
  };

  return (
    <UsuarioContext.Provider value={value}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => {
  const context = useContext(UsuarioContext);

  if (!context) {
    throw new Error("useUsuario debe ser utilizado dentro de un UsuarioProvider");
  }

  return context;
};


