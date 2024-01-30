import {supabase} from "../../Lib/supabase";


const handleBajaClase = async (bajaNRC) => {
  try {
    if (typeof bajaNRC !== 'undefined') {
      // Eliminar referencias en clases_usuario
      const { data: deleteUsuarioData, error: deleteUsuarioError } = await supabase
        .from('clases_usuario')
        .delete()
        .eq('nrc_fk', bajaNRC); // Ajusta el nombre de la columna según tu base de datos

      if (deleteUsuarioError) {
        console.error('Error al eliminar referencias en clases_usuario:', deleteUsuarioError);
        return; // Detenemos la ejecución si hay un error
      }

      console.log('Referencias en clases_usuario eliminadas correctamente', deleteUsuarioData);

      // Luego, elimina la clase en la tabla clases
      console.log('Eliminando la clase con NRC:', bajaNRC);
      const { data, error } = await supabase
        .from('clases')
        .delete()
        .eq('NRC', bajaNRC);

      if (error) {
        console.error('Error al eliminar la clase:', error);
      } else {
        console.log('Clase eliminada correctamente', data);
      }
    } else {
      console.error('El NRC pasado a handleBajaClase es undefined.');
    }
  } catch (error) {
    console.error('Error general al interactuar con Supabase:', error);
  }
  
};

export {
  handleBajaClase
};