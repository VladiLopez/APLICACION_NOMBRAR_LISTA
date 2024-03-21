/**
 * Este código maneja el registro de un nuevo usuario en una
 * base de datos utilizando Supabase. Primero, verifica si 
 * ya existe un usuario con el mismo código. Si el usuario no
 * existe, lo registra en la base de datos. Finalmente, 
 * muestra una alerta de éxito o error según el resultado de
 * la operación.
 */

// Importar Supabase Alert de react-native
import { supabase } from "../../Lib/supabase";
import { Alert } from 'react-native';

// Función para manejar el alta de un usuario
const handleAltaUsuario = async (registroData) => {
      try {
        // variable para manejar el alta de un nuevo usuario
        let verificar = false;
        // Consultar la base de datos para verificar si ya existe un usuario con el mismo código
        const { data: verificarusuario, error } = await supabase
          .from('usuarios')
          .select('Codigo')
          .eq('Codigo', registroData.Codigo);

        // Manejar errores en la consulta
        if (error) {
          Alert.alert("Alerta","Hubo un problema al verificar la existencia del usuario.");
        }

        // Verificar si se encontró algún registro
        if (verificarusuario && verificarusuario.length > 0) {
          verificar = true;
        }

        // Si ya existe un usuario con el mismo código, mostrar una alerta
        if (verificar) {
          Alert.alert("Ya se ha registrado un usuario con ese codigo.");
        } else {
            // Si no existe un usuario con el mismo código, insertar el nuevo usuario en la base de datos
            const { error: insertError } = await supabase
            .from('usuarios') 
            .upsert([
              registroData
            ]);

          // Manejar errores en la inserción
          if (insertError) {
            Alert.alert("Hubo un problema al registrar el usuario.");
          }

          // Mostrar una alerta de éxito
          Alert.alert("El usuario se ha registrado correctamente.");
        }
      } catch (error) {
        // Manejar errores generales
      }
    };

    // Exportar la función para manejar el alta de usuario
    export { handleAltaUsuario };