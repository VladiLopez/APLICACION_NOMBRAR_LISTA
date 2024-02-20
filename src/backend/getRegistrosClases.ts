import { supabase } from "../../Lib/supabase";

export const obtenerClasesPorProfesor = async (codigoProfesor) => {
  try {
    const { data, error } = await supabase
      .from('clases_usuario')
      .select('*')
      .eq('codigo_fk', codigoProfesor);

    if (error) {
      
      return [];
    } else {
      
      return data;
    }
  } catch (error) {
  
    return [];
  }
};

export const obtenerNRCsPorProfesor = async (codigoProfesor) => {
  try {
    if (!codigoProfesor) {
      return [];
    }

    const { data, error } = await supabase
      .from('clases_usuario')
      .select('nrc_fk')
      .eq('codigo_fk', codigoProfesor);

    if (error) {
     
      return [];
    } else if (data && data.length > 0) {
     
      return data.map((item) => item.nrc_fk);
    } else {
      return [];
    }
  } catch (error) {
   
    return [];
  }
};



export const obtenerDatosDeClasesPorNRCs = async (nrcs) => {
  try {
    // Si nrcs es un array vacío, retornar un array vacío
    if (!nrcs || nrcs.length === 0) {
      
      return [];
    }

    const { data, error } = await supabase
      .from('clases')
      .select('*')
      .in('NRC', nrcs);

    if (error) {
      
      return [];
    } else {
      
      return data;
    }
  } catch (error) {
   
    return [];
  }
};

export const obtenerClasesPorAlumno = async (codigoAlumno) => {
  try {
    const { data, error } = await supabase
      .from('clases_usuario')
      .select('nrc_fk')
      .eq('codigo_fk', codigoAlumno);

    if (error) {
      
      return [];
    } else if (data && data.length > 0) {
      
      return data.map((item) => item.nrc_fk);
    } else {
      return [];
    }
  } catch (error) {
   
    return [];
  }
};

export const obtenerUsuariosPorNRC = async (nrc, codigo_profesor) => {
  try {
    // Si el NRC es undefined o null, retornar un array vacío
    if (!nrc) {
      return [];
    }

    // Obtener los datos de los usuarios asociados a la clase (NRC)
    const { data, error } = await supabase
      .from('clases_usuario')
      .select('usuarios:codigo_fk (Nombre, Apellidos, Tipo_Usuario)')
      .eq('nrc_fk', nrc);

    if (error) {
     
      return [];
    } else {
      // Filtrar los usuarios excluyendo al profesor
      const usuariosData = data
        .filter(item => item.usuarios.Tipo_Usuario !== 'Profesor')
        .map(item => item.usuarios);

     
      return usuariosData;
    }
  } catch (error) {
    
    return [];
  }
};

export const obtenerDatosUsuarioPorCodigo = async (codigo) => {
  try {
    // Si el código es undefined o null, retornar un objeto vacío
    if (!codigo) {
      return {};
    }

    // Obtener los datos del usuario por su código
    const { data, error } = await supabase
      .from('usuarios')
      .select('Nombre, Apellidos, Codigo')
      .eq('Codigo', codigo)
      .single();

    if (error) {
     
      return {};
    } else {
      const usuarioData = data;
      
      return usuarioData;
    }
  } catch (error) {
    
    return {};
  }
};



export const obtenerClasesPorNRCs = async (nrcs) => {
  try {
    if (!nrcs || nrcs.length === 0) {
      return [];
    }

    const { data, error } = await supabase
      .from('clases')
      .select('NRC')
      .in('NRC', nrcs);

    if (error) {
      
      return [];
    } else {
      
      return data.map((item) => item.NRC);
    }
  } catch (error) {
    console.error('Error general al interactuar con Supabase:', error);
    return [];
  }
};

export const getAsistencias = async (selectedDate, nrc) => {
  try {
    const { data, error } = await supabase
      .from('asistencias')
      .select('codigo_asis_fk')
      .eq('nrc_asis_fk', nrc)
      .eq('fecha', selectedDate);

    if (error) {
     
      return [];
    } else {
     
      
      const codigosUsuarios = data.map(asistencia => asistencia.codigo_asis_fk);

      const datosAsistencia = await getDatosAsistencias(codigosUsuarios);
      return datosAsistencia;
    }
  } catch (error) {
    return [];
  }
};


export const getDatosAsistencias = async (codigosUsuarios) => {
  try {
    const datosAsistencia = await Promise.all(codigosUsuarios.map(async codigo => {
      try {
        const { data, error } = await supabase
          .from('usuarios')
          .select('Nombre, Apellidos')
          .eq('Codigo', codigo);

        if (error) {
         
          return null;
        } else {
          return data[0]; // Devolver solo el primer resultado, ya que debería ser único
        }
      } catch (error) {
        
        return null;
      }
    }));

    return datosAsistencia.filter(datos => datos !== null);
  } catch (error) {
    
    return [];
  }
};

export const getCodigos = async (selectedDate, nrc) => {
  try {
    const { data, error } = await supabase
      .from('asistencias')
      .select('hora') // Solo necesitamos la hora
      .eq('nrc_asis_fk', nrc)
      .eq('fecha', selectedDate);

    if (error) {
     
      return [];
    } else {
     
      return data.map(asistencia => asistencia.hora); // Devuelve solo las horas
    }
  } catch (error) {
   
    return [];
  }
};
