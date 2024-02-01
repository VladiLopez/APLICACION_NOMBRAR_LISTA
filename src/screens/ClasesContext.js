// ClasesContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  obtenerNRCsPorProfesor,
  obtenerDatosDeClasesPorNRCs,
  obtenerDatosDeClasePorId,
  obtenerUsuariosPorNRC,
} from "../backend/getRegistrosClases";

export const ClasesContext = createContext();

export const ClasesProvider = ({ children }) => {
  const [clases, setClases] = useState([]);
  const [datosClase, setDatosClase] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [codigoProfesor, setCodigoProfesor] = useState(null);

  const obtenerClasesProfesor = async () => {
    try {
      // Obtener los NRCs del profesor
      const nrcsProfesor = await obtenerNRCsPorProfesor(codigoProfesor);

      // Obtener los datos de las clases por NRCs
      const datosClases = await obtenerDatosDeClasesPorNRCs(nrcsProfesor);

      setClases(datosClases);
    } catch (error) {
      console.error("Error al obtener clases del profesor:", error);
    }
  };

  const obtenerDatosDeClase = async (idClase) => {
    try {
      const datos = await obtenerDatosDeClasePorId(idClase);
      setDatosClase(datos);
    } catch (error) {
      console.error("Error al obtener datos de la clase:", error);
    }
  };

  const obtenerClases = async () => {
    
      await obtenerClasesProfesor();
    
  };

  const agregarClase = (nuevaClase) => {
    setClases([...clases, { id: nuevaClase.NRC, ...nuevaClase }]);
  };

  const obtenerUsuarios = async (nrc) => {
    try {
      const nombresApellidos = await obtenerUsuariosPorNRC(nrc);
      console.log('Nombres y apellidos asociados al NRC:', nombresApellidos);
    } catch (error) {
      console.error("Error al obtener nombres y apellidos:", error);
    }
  };

  useEffect(() => {
    obtenerClases();
  }, [codigoProfesor]);

  const cerrarSesion = () => {
    // Resetea todos los valores a sus estados iniciales al cerrar sesión
    setTipoUsuario("");
    setCodigoProfesor("");
    setClases([]);
    setDatosClase(null);
  };

  const setCodigoUsuario = (codigoProfesor) => {
    setCodigoProfesor(codigoProfesor);
  };

  const value = {
    clases,
    setClases,
    agregarClase,
    datosClase,
    obtenerClases,
    setDatosClase,
    obtenerDatosDeClase,
    obtenerClases,
    setCodigoUsuario,
    obtenerUsuarios,
    codigoProfesor,
    cerrarSesion,
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
      