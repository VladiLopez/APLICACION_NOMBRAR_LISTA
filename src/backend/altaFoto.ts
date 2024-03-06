import { supabase } from "../../Lib/supabase";

export async function altaFoto(codigoProfesor, rutaFoto) {
  try {
    const { data, error } = await supabase
      .from('usuario_foto')
      .insert([{ 
        codigo_foto_fk: codigoProfesor,
        path: rutaFoto
      }]);
    
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}
