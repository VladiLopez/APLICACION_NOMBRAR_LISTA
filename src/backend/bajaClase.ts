/**
 * Este código maneja la eliminación de una clase y la eliminación
 * de un alumno de una clase en una base de datos utilizando Supabase.
 * Primero, verifica se se proporciona un NRC válido y un código
 * de usuario válido. Luego, elimina las referencias correspondientes 
 * en las tablas de la base de datos. Finalmente, realiza alguna acción
 * adicional si la eliminación fue exitosa.
 */

// Importar supabase de la biblioteca Supabase
import {supabase} from "../../Lib/supabase";

// Función para manejar la eliminación de una clase
const handleBajaClase = async (bajaNRC) => {
  try {
    // Verificar si se proporciona un NRC Válido
    if (typeof bajaNRC !== 'undefined') {
      // Eliminar referencias en clases_usuario
      const { data: deleteUsuarioData, error: deleteUsuarioError } = await supabase
        .from('clases_usuario')
        .delete()
        .eq('nrc_fk', bajaNRC); // Ajusta el nombre de la columna según tu base de datos

      // Manejar 
      if (deleteUsuarioError) {
        return; // Detenemos la ejecución si hay un error
      }
      // Eliminar referencias en asistencia (ajusta el esquema si es diferente)
      const { data: deleteAsistenciaData, error: deleteAsistenciaError } = await supabase
      .from('asistencias') // ajusta el esquema si es diferente
      .delete()
      .eq('nrc_asis_fk', bajaNRC);

      // Manejar errores en la eliminación de referencias en clase_usuario
      if (deleteAsistenciaError) {
        return;
      }

      // Eliminar referencias en la tabla asistencias
      const { data, error } = await supabase
        .from('clases')
        .delete()
        .eq('NRC', bajaNRC);

        if (error) {
        // Agregamos un poco de tolerancia a fallos
      } else {
        // manejador de errores si es necesario
      }
    } else {
      // Manejador de errores
    }
  } catch (error) {
    // Tolerancia a fallos
  }
  
};

// Función para manejar la eliminación de un alumno de una clase
const handleBajaClaseAlumno = async (codigoUsuario, bajaNRC) => {
  try {
    // Verificar si se proporciona un código de usuario y un NRC válido
    if (typeof bajaNRC !== 'undefined' && typeof codigoUsuario !== 'undefined') {
      // Verificar si existe un registro con el código de usuario y NRC
      const { data: existenciaData, error: existenciaError } = await supabase
        .from('clases_usuario')
        .select('*')
        .eq('codigo_fk', codigoUsuario)
        .eq('nrc_fk', bajaNRC);

      // Manejar errores en la consulta de existencia
      if (existenciaError) {
        return; // Detenemos la ejecución si hay un error
      }

      // Si existe el registro, procedemos a eliminarlo
      if (existenciaData && existenciaData.length > 0) {
        const { data: deleteUsuarioData, error: deleteUsuarioError } = await supabase
          .from('clases_usuario')
          .delete()
          .eq('codigo_fk', codigoUsuario)
          .eq('nrc_fk', bajaNRC);

        // Manejar errores en la eliminación de la relacion alumno-clase
        if (deleteUsuarioError) {
          return; // Detenemos la ejecución si hay un error al eliminar
        }
      } else {
        // Manejar el caso en el que no existe el registro en la tabla clases_usuario
      }
    } else {
      // Manejar el caso en el que no se proporciona un NRC o un código de usuario válido
    }
  } catch (error) {
    // Manejar errores generales
  }
};

// Exportar las funciones de manejo de baja de clase y baja de clase para un alumno
export {
  handleBajaClase,
  handleBajaClaseAlumno,
};