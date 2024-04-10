/**
 * Módulo ClassContext.
 * 
 * @description Este módulo define un contexto y un proveedor de contexto para gestionar el estado relacionado con las clases y los usuarios
 * Proporciona funciones para obetener clases de un profesor, obtener datos de una clase, agregar una nueva clase,
 * obtener usuarios asociados a una clase, cerrar sesión y gestionar la imagen de perfil del alumno.
 */

// ClasesContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage
import { obtenerNRCsPorProfesor, obtenerDatosDeClasesPorNRCs, obtenerDatosDeClasePorId, obtenerUsuariosPorNRC } from "../backend/getRegistrosClases";

// Crear el contexto para gestionar el estado relacionado con las clases y los usuarios
export const ClasesContext = createContext();

export const ClasesProvider = ({ children }) => {
  const [clases, setClases] = useState([]);// Estado para almacenar las clases
  const [datosClase, setDatosClase] = useState(null);// Estado para almacenar los datos de una clase
  const [tipoUsuario, setTipoUsuario] = useState("");// Estado para almacenar el tipo de usuario
  const [codigoProfesor, setCodigoProfesor] = useState(null);// Estado para almacenar el código de profesor
  const [perfilImagen, setPerfilImagen] = useState(null); // Nuevo estado para la imagen de perfil

  // Función para obtener las clases de un profesor
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
  // Función para obtener los datos de una clase
  const obtenerDatosDeClase = async (idClase) => {
    try {
      const datos = await obtenerDatosDeClasePorId(idClase);
      setDatosClase(datos);
    } catch (error) {
      console.error("Error al obtener datos de la clase:", error);
    }
  };

  // Función para obtener todas las clases
  const obtenerClases = async () => {    
      await obtenerClasesProfesor();
  };

  // Función para agregar una nueva clase
  const agregarClase = (nuevaClase) => {
    setClases([...clases, { id: nuevaClase.NRC, ...nuevaClase }]);
  };

  // Función para obtener los usuarios asociados a una clase
  const obtenerUsuarios = async (nrc) => {
    try {
      const nombresApellidos = await obtenerUsuariosPorNRC(nrc);
      console.log('Nombres y apellidos asociados al NRC:', nombresApellidos);
    } catch (error) {
      console.error("Error al obtener nombres y apellidos:", error);
    }
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    // Resetea todos los valores a sus estados iniciales al cerrar sesión
    setTipoUsuario("");
    setCodigoProfesor("");
    setClases([]);
    setDatosClase(null);
    setPerfilImagen(null); // Resetear la imagen de perfil al cerrar sesión
  };

  // Función para establecer el código de usuario
  const setCodigoUsuario = (codigoProfesor) => {
    setCodigoProfesor(codigoProfesor);
  };

  // función para establecer la imagen de perfil
  const setPerfilImage = async (imageUri) => {
    try {
      await AsyncStorage.setItem(`selectedImage_${codigoProfesor}`, imageUri); // Guardar la nueva imagen de perfil en AsyncStorage
      setPerfilImagen(imageUri); // Actualizar la imagen de perfil en el estado
    } catch (error) {
      console.error('Error al guardar la imagen de perfil:', error);
    }
  };

  // Función para obtener la imagen de perfil
  const getPerfilImage = async () => {
    try {
      const imageUri = await AsyncStorage.getItem(`selectedImage_${codigoProfesor}`); // Obtener la imagen de perfil desde AsyncStorage
      setPerfilImagen(imageUri); // Actualizar la imagen de perfil en el estado
    } catch (error) {
      console.error('Error al obtener la imagen de perfil:', error);
    }
  };

  useEffect(() => {
    obtenerClases();
    getPerfilImage(); // Obtener la imagen de perfil al cargar el contexto
  }, [codigoProfesor]); // Solo codigoProfesor en la lista de dependencias

  // Valor del contexto
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
    setPerfilImage, // Agregar el método para establecer la imagen de perfil
    perfilImagen, // Agregar la imagen de perfil al contexto
  };

  // Renderizamos el contexto
  return (
    <ClasesContext.Provider value={value}>
      {children}
    </ClasesContext.Provider>
  );
};

// Hook personalizado para utilizar el contexto
export const useClases = () => {
  const context = useContext(ClasesContext);

  if (!context) {
    throw new Error("useClases debe ser utilizado dentro de un ClasesProvider");
  }

  // Exportamos el componente
  return context;
};