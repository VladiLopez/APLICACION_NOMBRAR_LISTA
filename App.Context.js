
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [refreshToken, setRefreshToken] = useState(false);

  const refreshApp = () => {
    setRefreshToken((prev) => !prev);
  };

  const value = {
    refreshToken,
    refreshApp,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext debe ser utilizado dentro de un AppProvider');
  }

  return context;
};
