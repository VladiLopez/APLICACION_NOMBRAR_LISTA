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

        //
        if (error) {
          Alert.alert("Alerta","Hubo un problema al verificar la existencia del usuario.");
        }

        // Verificar si se encontró algún registro
        if (verificarusuario && verificarusuario.length > 0) {
          verificar = true;
        }

        if (verificar) {
          Alert.alert("Ya se ha registrado un usuario con ese codigo.");
        } else {
          
            const { error: insertError } = await supabase
            .from('usuarios') 
            .upsert([
              registroData
            ]);

          if (insertError) {
            Alert.alert("Hubo un problema al registrar el usuario.");
          }

          Alert.alert("El usuario se ha registrado correctamente.");
        }
      } catch (error) {
        
      }
    };

    export {
      handleAltaUsuario
    };