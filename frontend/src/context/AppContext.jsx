import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tiposSolicitudes, setTiposSolicitudes] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);

  return (
    <AppContext.Provider value={{ tiposSolicitudes, setTiposSolicitudes, solicitudes, setSolicitudes }}>
      {children}
    </AppContext.Provider>
  );
};