// Importar supabase
import { supabase } from "../../Lib/supabase";

// Función para registrar la hora de llegada del alumno en Supabase
const registrarHoraLlegada = async (codigoAlumno, nrcClase) => {
  try {
    // Obtener la fecha y hora actual
    const fechaHoraActual = new Date();
    const fecha = fechaHoraActual.toISOString().split('T')[0]; // Obtener solo la fecha en formato YYYY-MM-DD
    const hora = fechaHoraActual.toTimeString().split(' ')[0]; // Obtener solo la hora en formato HH:MM:SS
    
    // Insertar el registro de asistencia en la tabla de Supabase
    const { data, error } = await supabase.from('asistencias').insert([
      { codigo_asis_fk: codigoAlumno, fecha: fecha, hora: hora, nrc_asis_fk: nrcClase },
    ]);
    
    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export { registrarHoraLlegada };
