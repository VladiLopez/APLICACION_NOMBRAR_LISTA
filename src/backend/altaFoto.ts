import { supabase } from "../../Lib/supabase";

// Función para almacenar la ruta de una foto en la base de datos
export async function altaFoto(codigoProfesor, rutaFoto) {
  try {
    // Insertar la ruta de la foto en la tabla 'usuario_foto'
    const { data, error } = await supabase
      .from('usuario_foto')
      .insert([{ 
        codigo_foto_fk: codigoProfesor,
        path: rutaFoto
      }]);
    
    // Manejar errores en la operación de inserción
    if (error) {
      throw error;
    }

    // Retornar los datos insertados, si es necesario
    return data;
  } catch (error) {
    // Manejar errores generales
    throw error;
  }
}
