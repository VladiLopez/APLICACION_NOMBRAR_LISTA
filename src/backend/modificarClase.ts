// Importamos los modulos y los componentes necesarios para poder realizar todos los procesos del backend y las funciones
import {supabase} from "../../Lib/supabase";

/**
 * Modifica una clase existente en la base de datos.
 * 
 * @param {string} nrc - El NRC (Número de Registro de Curso) de la clase que se desea modificar. 
 * @param {Object} nuevaClase - Un objeto que contiene los nuevos datos de la clase a modificar. 
 * @returns {Object|null} - Un objeto que representa los datos actualizador de la clase, o null si ocurre un error. 
 */
export const modificarClase = async (nrc, nuevaClase) => {
      try {
        // Sentencia sql para obtener los datos como el NRC de la tabla 'clase' con el componente Supabase
        const { data, error } = await supabase
          .from('clases')
          .update(nuevaClase)
          .eq('NRC', nrc);

        // Agregamos un poco de tolerancia a fallas
        if (error) {
          return null;
        }

        // Caso de exito, devolvemos los datos
        return data;
      } catch (error) {        
        return null;
      }
    };