import {supabase} from "../../Lib/supabase";

const handleAltaUsuario = async (registroData) => {
      try {
        const { data, error } = await supabase
          .from('usuarios') // Reemplaza 'Clases' con el nombre real de tu tabla en Supabase
          .upsert([
            registroData
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
      handleAltaUsuario
    };