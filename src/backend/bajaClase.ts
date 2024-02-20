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
  
        return; // Detenemos la ejecución si hay un error
      }
      // Eliminar referencias en asistencia (ajusta el esquema si es diferente)
      const { data: deleteAsistenciaData, error: deleteAsistenciaError } = await supabase
      .from('asistencias') // ajusta el esquema si es diferente
      .delete()
      .eq('nrc_asis_fk', bajaNRC);

      if (deleteAsistenciaError) {
        return;
      }

      const { data, error } = await supabase
        .from('clases')
        .delete()
        .eq('NRC', bajaNRC);

      if (error) {
        
      } else {
        
      }
    } else {

    }
  } catch (error) {
    
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
         
          return; // Detenemos la ejecución si hay un error al eliminar
        }

       
      } else {
       
      }
    } else {
      
    }
  } catch (error) {
    
  }
};


export {
  handleBajaClase,
  handleBajaClaseAlumno,
};