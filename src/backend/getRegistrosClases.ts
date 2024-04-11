/**
 * Importamos los modulos y las librerías necesarías para desplegar los elementos visuales
 */
import { supabase } from "../../Lib/supabase";

/**
 * Obtiene todas las clases asociadas a un profesor específico.
 * 
 * @param {string} codigoProfesor - El código del profesor del que se desean obtener las clases. 
 * @returns {Array} - Un array de objetos que representan las clases asociadas al profesor. 
 */
export const obtenerClasesPorProfesor = async (codigoProfesor) => {
  // Código de la función
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

/**
 * Obtiene todos los NRCs (Número de Registro de Curso) asociados a un profesor especifico.
 * @param {string} codigoProfesor - El código del profesor del que se deesean obtener los NRCs.
 * @returns {Array} -  Un array de string que representan los NRCs asociados al profesor.
 */
export const obtenerNRCsPorProfesor = async (codigoProfesor) => {
  try {
    if (!codigoProfesor) {
      return [];
    }

    // Sentencia SQL
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

/**
 * Obtiene los datos de todas las clases asociadas a un conjunto de NRCs.
 * 
 * @param {Array} nrcs - Un array de string que representan los NRCs de las clases deseadas. 
 * @returns {Array} - Un array de objetos que representan las clases asociadas a los NRCs proporciados.
 */
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

/**
 * Obtiene los datos de todas las clases asociadas a un conjunto de NRCs.
 * 
 * @param {string} codigoAlumno - El código del alumno del que se desean obtener los NRCs.
 * @returns {Array} - Un array de strings que representan los NRCs asociados al alumno.
 */
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

/**
 * Obtiene los datos de los usuarios asociados a un NRC específico, excluyendo al profesor.
 * 
 * @param {string} nrc - El NRC del curso del que se desean obtener los usuarios.
 * @param {string} codigo_profesor - El código del profesor (se utiliza para excluir al profesor de los resultados).
 * @returns {array} - Un array de objetos que representan los usuarios asociados al NRC, excluyendo al profesor.
 */
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

/**
 * Obtiene los datos de un usuario por su código.
 * 
 * @param {string} codigo - El código del usuario del que se desean obtener los datos. 
 * @returns {Object} - Un objeto que representa los datos del usuario
 */
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

/**
 * Obtiene los NRCs (Número de Registro de Curso) asociados a un conjunto de NRCs.
 * 
 * @param {Array} nrcs - Un array de strings que representan los NRCs de las clases deseadas. 
 * @returns {Array} - Un array de strings que representan los NRCs asociados a los NRCs proporcionados.
 */
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


