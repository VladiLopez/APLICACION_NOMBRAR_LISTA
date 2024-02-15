
import {supabase} from "../../Lib/supabase";

export const modificarClase = async (nrc, nuevaClase) => {
      try {
        const { data, error } = await supabase
          .from('clases')
          .update(nuevaClase)
          .eq('NRC', nrc);

        if (error) {
          console.error('Error al actualizar la clase:', error);
          return null;
        }

        console.log('Clase actualizada correctamente:', data);
        return data;
      } catch (error) {
        console.error('Error general al interactuar con Supabase:', error);
        return null;
      }
    };