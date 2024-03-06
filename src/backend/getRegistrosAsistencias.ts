import { supabase } from "../../Lib/supabase";

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