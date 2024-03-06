import { supabase } from "../../Lib/supabase";
import { Alert } from 'react-native';

const handleAltaUsuario = async (registroData) => {
      try {

        let verificar = false;
        const { data: verificarusuario, error } = await supabase
          .from('usuarios')
          .select('Codigo')
          .eq('Codigo', registroData.Codigo);

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