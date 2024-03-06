
import {supabase} from "../../Lib/supabase";

export const modificarClase = async (nrc, nuevaClase) => {
      try {
        const { data, error } = await supabase
          .from('clases')
          .update(nuevaClase)
          .eq('NRC', nrc);

        if (error) {
          
          return null;
        }

        
        return data;
      } catch (error) {
        
        return null;
      }
    };