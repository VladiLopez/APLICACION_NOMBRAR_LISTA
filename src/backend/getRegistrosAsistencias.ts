/**
 * Este archivo contiene funciones para obtener las asistencias
 * de una fecha y un NRC especificos, obtener los datos de asistencias
 *  de los usuarios correspondientes a un fecha y un NRC especificos.
 */

// Importar Supabase de la biblioteca Supabase
import { supabase } from "../../Lib/supabase";

// Función para obtener las asistencias de una fecha y un NRC especificos
export const getAsistencias = async (selectedDate, nrc) => {
  try {
    // Consultar la base de datos para obtener las asistencias correspondientes al NRC y la fecha seleccionados
    const { data, error } = await supabase
      .from('asistencias')
      .select('codigo_asis_fk')
      .eq('nrc_asis_fk', nrc)
      .eq('fecha', selectedDate);

    // Manejar errores en la consulta
    if (error) {
      return []; // Devolver un array vació en caso de error
    } else {
      // Obtener los códigos de usuarios de las asistencias obtenidas
      const codigosUsuarios = data.map(asistencia => asistencia.codigo_asis_fk);

      // Obtener los datos de asistencia de los usuarios correspondientes a los códigos obtenidos
      const datosAsistencia = await getDatosAsistencias(codigosUsuarios);
      return datosAsistencia;
    }
  } catch (error) {
    return [];// Devolver un array vacío en caso de error
  }
};

/**
 * Función para obtener los datos de asistencia de los usuarios
 * correspondientes a los códigos proporcionados
 */
export const getDatosAsistencias = async (codigosUsuarios) => {
  try {
    // Obtenner los datos de asistencia de los usuarios correspondientes a los códigos proporcionados
    const datosAsistencia = await Promise.all(codigosUsuarios.map(async codigo => {
      try {
        const { data, error } = await supabase
          .from('usuarios')
          .select('Nombre, Apellidos')
          .eq('Codigo', codigo);

        // Manejar errores en la consulta
        if (error) {
          return null;// Devolver null en caso de error

        } else {
          return data[0]; // Devolver solo el primer resultado, ya que debería ser único
        }
      } catch (error) {
        
        return null;// Devolver null en caso de error
      }
    }));

    return datosAsistencia.filter(datos => datos !== null);
  } catch (error) {
    
    return [];
  }
};

// Función para obtener los códigos de las asistencias correspondientes a una fecha y un NRC especificos
export const getCodigos = async (selectedDate, nrc) => {
  try {
    // Consultar la base de datos para obtener los códigos de las asistencias correspondientes al NRC y la fecha seleccionados
    const { data, error } = await supabase
      .from('asistencias')
      .select('hora') // Solo necesitamos la hora
      .eq('nrc_asis_fk', nrc)
      .eq('fecha', selectedDate);

    // Manejar errores en la consulta
    if (error) {
      return [];
    } else {
      // Devolver solo las horas de las asistencias obtenidas
      return data.map(asistencia => asistencia.hora); // Devuelve solo las horas
    }
  } catch (error) {
    return [];// Devolver un array vacío en caso de error
  }
};