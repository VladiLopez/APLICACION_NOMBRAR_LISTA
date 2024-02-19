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
          console.error('Error al escribir en la tabla:', error);
        } else {
          console.log('Datos escritos correctamente:', data);
        }
      } catch (error) {
        console.error('Error general al interactuar con Supabase:', error);
      }
    };

    const handleAltaRelacion = async (codigo, nrc) => {
      try {
        const { data, error } = await supabase
          .from('clases_usuario')
          .upsert([
            { codigo_fk: codigo, nrc_fk: nrc }
          ]);

        if (error) {
          console.error('Error al escribir en la tabla:', error);
        } else {
          console.log('Datos escritos correctamente:', data);
        }
      } catch (error) {
        console.error('Error general al interactuar con Supabase:', error);
      }
    };

    export {
    	handleAltaClase,
      handleAltaRelacion,
    };