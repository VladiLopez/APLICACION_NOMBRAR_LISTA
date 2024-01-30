// getRegistrosClases.js
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

// Otras funciones necesarias...
