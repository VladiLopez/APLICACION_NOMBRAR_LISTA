// Importación de los módulos y componentes desde React Native
import { Alert } from 'react-native';
// Importamos el módulo de Supabase desde Supabase
import {supabase} from "../../Lib/supabase";

// Función para manejar el alta de una nueva clase en la base de datos
const handleAltaClase = async (nuevaClase) => {
      try {
        // Realizar operación upsert en la tabla 'clases' de la base de datos
        const { data, error } = await supabase
          .from('clases') // Reemplaza 'Clases' con el nombre real de tu tabla en Supabase
          .upsert([
            nuevaClase
          ]);
    
        // Manejo errores de la operación
        if (error) {
          Alert.alert("Alerta","No existe una clase con ese NRC, u ocurrio un error");
          
        } else {
          // Operación exitosa, si es necesario realizar alguna acción adicional aquí
        }
      } catch (error) {
        // Manejar errores generales
      }
    };

    // Función para manejar el alta de la relación entre un usuario y una clase en la base de datos
    const handleAltaRelacion = async (codigo, nrc) => {
      try {

        let nrcExistencia = false;

        // Verificar si existe alguna relación entre el usuario y la clase
        const { data: nrcExistente, error } = await supabase
          .from('clases_usuario')
          .select('nrc_fk')
          .eq('nrc_fk', nrc)
          .eq('codigo_fk', codigo)

        // Manejar errores de consulta
        if (error) {
          Alert.alert("Alerta","No existe una clase con ese NRC, u ocurrio un error");
        }

        // Verificar si se encontró algún registro
        if (nrcExistente && nrcExistente.length > 0) {
          nrcExistencia = true;
        }

        // Manejar el caso de que ya exista una relación entre el usuario y la clase
        if (nrcExistencia) {
          Alert.alert("Alerta", "Ya te has registrado a esa clase");
        } else {
          // Insertar una nueva relación entre el usuario y la clase
          const { error: insertError } = await supabase
          .from('clases_usuario')
          .upsert([
            { codigo_fk: codigo, nrc_fk: nrc }
          ]);

          // Manejar errores en la inserción
          if (insertError) {
            throw new Error("Hubo un problema al registrar la asistencia.");
          }

          Alert.alert("Éxito", "La clase se registro correctamente");
        }

      } catch (error) {
        // Manejar errores generales
        Alert.alert("Alerta","No existe una clase con ese NRC, u ocurrio un error");
      }
    };

    // Exportar las funciones de manejo de alta de clase y  alta de relación
    export {
    	handleAltaClase,
      handleAltaRelacion,
    };