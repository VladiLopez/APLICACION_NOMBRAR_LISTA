import { supabase } from "../../Lib/supabase";

export const obtenerClasesPorProfesor = async (codigoProfesor) => {
  try {
    const { data, error } = await supabase
      .from('clases_usuario')
      .select('*')
      .eq('codigo_fk', codigoProfesor);

    if (error) {
      console.error('Error al obtener las clases del profesor:', error);
      return [];
    } else {
      console.log('Clases del profesor obtenidas correctamente:', data);
      return data;
    }
  } catch (error) {
    console.error('Error general al interactuar con Supabase:', error);
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
      console.error('Error al obtener los NRCs del profesor:', error);
      return [];
    } else if (data && data.length > 0) {
      console.log('NRCs del profesor obtenidos correctamente:', data);
      return data.map((item) => item.nrc_fk);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error general al interactuar con Supabase:', error);
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
      console.error('Error al obtener datos de las clases por NRCs:', error);
      return [];
    } else {
      console.log('Datos de las clases por NRCs obtenidos correctamente:', data);
      return data;
    }
  } catch (error) {
    console.error('Error general al interactuar con Supabase:', error);
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
      console.error('Error al obtener las clases del alumno:', error);
      return [];
    } else if (data && data.length > 0) {
      console.log('Clases del alumno obtenidas correctamente:', data);
      return data.map((item) => item.nrc_fk);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error general al interactuar con Supabase:', error);
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
      console.error('Error al obtener datos de usuarios por NRC:', error);
      return [];
    } else {
      // Filtrar los usuarios excluyendo al profesor
      const usuariosData = data
        .filter(item => item.usuarios.Tipo_Usuario !== 'Profesor')
        .map(item => item.usuarios);

      console.log('Datos de usuarios por NRC obtenidos correctamente:', usuariosData);
      return usuariosData;
    }
  } catch (error) {
    console.error('Error general al interactuar con Supabase:', error);
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
      console.error('Error al obtener datos de usuario por código:', error);
      return {};
    } else {
      const usuarioData = data;
      console.log('Datos de usuario por código obtenidos correctamente:', usuarioData);
      return usuarioData;
    }
  } catch (error) {
    console.error('Error general al interactuar con Supabase:', error);
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
      console.error('Error al obtener datos de las clases por NRCs:', error);
      return [];
    } else {
      console.log('Datos de las clases por NRCs obtenidos correctamente:', data);
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
      console.error('Error al obtener asistencias por fecha y NRC:', error);
      return [];
    } else {
      console.log('Asistencias por fecha y NRC obtenidas correctamente:', data);
      
      const codigosUsuarios = data.map(asistencia => asistencia.codigo_asis_fk);
      console.log('Códigos de usuarios obtenidos:', codigosUsuarios);

      const datosAsistencia = await getDatosAsistencias(codigosUsuarios);
      return datosAsistencia;
    }
  } catch (error) {
    console.error("Ocurrió un error al obtener asistencias:", error);
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
          console.error('Error al obtener datos de usuario para el código:', codigo, error);
          return null;
        } else {
          return data[0]; // Devolver solo el primer resultado, ya que debería ser único
        }
      } catch (error) {
        console.error('Error al obtener datos de usuario:', error);
        return null;
      }
    }));

    return datosAsistencia.filter(datos => datos !== null);
  } catch (error) {
    console.error('Error al obtener datos de usuarios:', error);
    return [];
  }
};

export const getCodigos = async (selectedDate, nrc) => {
  try {
    const { data, error } = await supabase
      .from('asistencias')
      .select('codigo_asis_fk, hora')
      .eq('nrc_asis_fk', nrc)
      .eq('fecha', selectedDate);

    if (error) {
      console.error('Error al obtener asistencias por fecha y NRC:', error);
      return [];
    } else {
      console.log('Asistencias por fecha y NRC obtenidas correctamente:', data);

      // Obtener los códigos de usuario
      const codigosUsuarios = data.map(asistencia => asistencia.codigo_asis_fk);

      // Obtener las horas de llegada
      const horas = await getHora(codigosUsuarios);

      return horas;
    }
  } catch (error) {
    console.error("Ocurrió un error al obtener asistencias:", error);
    return [];
  }
};

export const getHora = async (codigosUsuarios) => {
  try {
    const horas = await Promise.all(codigosUsuarios.map(async codigo => {
      try {
        const { data, error } = await supabase
          .from('asistencias')
          .select('hora')
          .eq('codigo_asis_fk', codigo);
  
        if (error) {
          console.error('Error al obtener hora de llegada del alumno:', error);
          return null;
        } else {
          const hora = data[0]?.hora;
          if (hora) {
            // Dividir la cadena de hora por el carácter '-' y tomar el primer elemento
            const [horaPart] = hora.split('-');
            // Dividir la cadena de horaPart por el carácter ':' para obtener la hora y los minutos
            const [hour, minute] = horaPart.split(':');
            return `${hour}:${minute}`;
          } else {
            return null;
          }
        }
      } catch (error) {
        console.error('Error al obtener hora de llegada del alumno:', error);
        return null;
      }
    }));
  
    return horas.filter(hora => hora !== null);
  } catch (error) {
    console.error('Error al obtener hora de llegada del alumno:', error);
    return [];
  }
};
