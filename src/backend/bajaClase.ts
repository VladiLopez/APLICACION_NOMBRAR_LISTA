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

      // Eliminar referencias en asistencia (ajusta el esquema si es diferente)
      const { data: deleteAsistenciaData, error: deleteAsistenciaError } = await supabase
      .from('asistencias') // ajusta el esquema si es diferente
      .delete()
      .eq('nrc_asis_fk', bajaNRC);

      if (deleteAsistenciaError) {
        console.error('Error al eliminar referencias en asistencia:', deleteAsistenciaError);
        return;
      }

      console.log('Referencias en asistencia eliminadas correctamente', deleteAsistenciaData);


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


const handleBajaClaseAlumno = async (codigoUsuario, bajaNRC) => {
  try {
    if (typeof bajaNRC !== 'undefined' && typeof codigoUsuario !== 'undefined') {
      // Verificar si existe un registro con el código de usuario y NRC
      const { data: existenciaData, error: existenciaError } = await supabase
        .from('clases_usuario')
        .select('*')
        .eq('codigo_fk', codigoUsuario)
        .eq('nrc_fk', bajaNRC);

      if (existenciaError) {
        console.error('Error al verificar la existencia del registro:', existenciaError);
        return; // Detenemos la ejecución si hay un error
      }

      // Si existe el registro, procedemos a eliminarlo
      if (existenciaData && existenciaData.length > 0) {
        const { data: deleteUsuarioData, error: deleteUsuarioError } = await supabase
          .from('clases_usuario')
          .delete()
          .eq('codigo_fk', codigoUsuario)
          .eq('nrc_fk', bajaNRC);

        if (deleteUsuarioError) {
          console.error('Error al eliminar referencias en clases_usuario:', deleteUsuarioError);
          return; // Detenemos la ejecución si hay un error al eliminar
        }

        console.log('Referencias en clases_usuario eliminadas correctamente', deleteUsuarioData);
      } else {
        console.warn('No existe un registro con el código de usuario y NRC proporcionados.');
      }
    } else {
      console.error('El código de usuario o el NRC pasado a handleBajaClase son undefined.');
    }
  } catch (error) {
    console.error('Error general al interactuar con Supabase:', error);
  }
};


export {
  handleBajaClase,
  handleBajaClaseAlumno,
};