//los backs que avance este es del alta a la clase
import { Alert } from 'react-native';
import {supabase} from "../../Lib/supabase";

const handleAltaClase = async (nuevaClase) => {
      try {
        const { data, error } = await supabase
          .from('clases') // Reemplaza 'Clases' con el nombre real de tu tabla en Supabase
          .upsert([
            nuevaClase
          ]);
    
        if (error) {
          Alert.alert("Alerta","No existe una clase con ese NRC, u ocurrio un error");
          
        } else {
          
        }
      } catch (error) {
        
      }
    };

    const handleAltaRelacion = async (codigo, nrc) => {
      try {

        let nrcExistencia = false;

        const { data: nrcExistente, error } = await supabase
          .from('clases_usuario')
          .select('nrc_fk')
          .eq('nrc_fk', nrc)
          .eq('codigo_fk', codigo)

        if (error) {

          Alert.alert("Alerta","No existe una clase con ese NRC, u ocurrio un error");
         
        }

        // Verificar si se encontró algún registro
        if (nrcExistente && nrcExistente.length > 0) {
          
          nrcExistencia = true;
        }
        if (nrcExistencia) {
          Alert.alert("Alerta", "Ya te has registrado a esa clase");
        } else {
          // Insertar el nuevo registro
          const { error: insertError } = await supabase
          .from('clases_usuario')
          .upsert([
            { codigo_fk: codigo, nrc_fk: nrc }
          ]);

          if (insertError) {
            throw new Error("Hubo un problema al registrar la asistencia.");
          }

          Alert.alert("Éxito", "La clase se registro correctamente");
        }

      } catch (error) {
        Alert.alert("Alerta","No existe una clase con ese NRC, u ocurrio un error");
      }
    };

    export {
    	handleAltaClase,
      handleAltaRelacion,
    };