/**
 * ClasesContext.js
 * Este archivo define el contexto y el proveedor de 
 * contexto para gestionar el estado de las clases
 * en la aplicacion React Native. Tambien proporciona 
 * funciones para obtener y manipular datos relacionados con las clases.
 */
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  obtenerDatosDeClasePorId,
  obtenerDatosDeClasesPorNRCs,
  obtenerNRCsPorProfesor,
} from "../backend/getRegistrosClases";

/**
 * Crear un contexto para gestionar el estado de las clases
 */
const ClasesContext = createContext();

/**
 * Provedoor de contexto para el estado de las clases.
 * Este proveedor utiliza el contexto creado para 
 * gestionar el estado de las clases y proporcionarlo a los componentes hijos.
 * 
 * @param { object } props - Propiedades del componente. 
 * @param { ReactNode } props.children - Componentes hijos que consumiran el contexto.
 */
export const ClasesProvider = ({ children }) => {
  // Estados locales para almacenar informacion relacionada con las clases y el usuario.
  const [clases, setClases] = useState([]);
  const [datosClase, setDatosClase] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [codigoProfesor, setCodigoProfesor] = useState("");

  /**
   * Obtiene los NRCs del profesor y los utiliza para obtener los datos de las clases correspondiente
   */
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

  /**
   * Obtiene los datos de una clase especifica mediante su ID
   * @param { string } idClase -ID de la clase que se desea obtener.
   */
  const obtenerDatosDeClase = async (idClase) => {
    try {
      const datos = await obtenerDatosDeClasePorId(idClase);
      setDatosClase(datos);
    } catch (error) {
      console.error("Error al obtener datos de la clase:", error);
    }
  };

  /**
   * Agrega una nueva clase al estado de clases.
   * @param { object } nuevaClase - Objeto que representa
   * la nueva clase a agregar. 
   */
  const agregarClase = (nuevaClase) => {
    setClases([...clases, { id: nuevaClase.NRC, ...nuevaClase }]);
  };

  /**
   * Obtiene las clases del profesor al cambiar su codigo.
   */
  const obtenerClases = async () => {
    
      await obtenerClasesProfesor();
    
  };

  /**
   * Reiniciar el tipo de usuario a un estado inicial.
   */
  const resetTipoUsuario = () => {
    setTipoUsuario("");
    console.log(tipoUsuario);
  };

  /**
   * Efecto secundario para obtener las clases del 
   * profesor al cambiar su codigo
   */
  useEffect(() => {
    obtenerClases();
  }, [codigoProfesor]);

  /**
   * Establecer el tipo de usuario
   * @param { string } tipo - Tipo de usuario que se establecera.
   */
  const getTipoUsuario = (tipo) => {
    setTipoUsuario(tipo);
  };

  /**
   * Cierra la sesión del usuario y restablece todos los valores a sus estados iniciales.
   */
  const cerrarSesion = () => {
    // Resetea todos los valores a sus estados iniciales al cerrar sesión
    setTipoUsuario("");
    setCodigoProfesor("");
    setClases([]);
    setDatosClase(null);
  };

  /**
   * Establece el codigo del profesor.
   * @param { string } codigoProfesor - Codigo del profesor que se establecera. 
   */
  const setProfesor = (codigoProfesor) => {
    setCodigoProfesor(codigoProfesor);
  };

  // Contexto que se proporcionará a los componentes hijos
  const value = {
    clases,
    setClases,
    agregarClase,
    datosClase,
    obtenerClases,
    setDatosClase,
    obtenerDatosDeClase,
    getTipoUsuario,
    resetTipoUsuario,
    obtenerClases,
    setProfesor,
    setCodigoProfesor,
    cerrarSesion,
  };

  // Renderizamos el componente visual
  return (
    <ClasesContext.Provider value={value}>
      {children}
    </ClasesContext.Provider>
  );
};

/**
 * Hook personalizado para consumir el contexto de las clases.
 * Este hook facilita el acceso al estado de las clases en los componentes que lo utilizan.
 * @returns { Object } - Contexto de las clases que contiene el estado y las funciones para actualizarlo.
 * @throws { Error } -  Si se intenta utilizar fuera de un ClasesProvider
 */
export const useClases = () => {
  const context = useContext(ClasesContext);

  if (!context) {
    throw new Error("useClases debe ser utilizado dentro de un ClasesProvider");
  }

  return context;
};
      