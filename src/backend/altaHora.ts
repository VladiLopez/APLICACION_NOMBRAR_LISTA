/**
 * Importamos Supabase y Alert de react-native
 */
import { supabase } from "../../Lib/supabase";
import { Alert } from 'react-native';

/**
 * Función para registrar la hora de llegada de un alumno a una clase
 */
const registrarHoraLlegada = async (codigoAlumno, nrcClase) => {
  try {
    // Obtener la fecha y hora actual
    const fechaHoraActual = new Date();
    const fecha = fechaHoraActual.toISOString().split('T')[0]; // Obtener solo la fecha en formato YYYY-MM-DD
    const hora = fechaHoraActual.toTimeString().split(' ')[0]; // Obtener solo la hora en formato HH:MM:SS
    
    // Variable booleana para verificar si ya se tomó la asistencia para ese alumno
    let asistenciaTomada = false;

    // Consultar la base de datos para verificar si ya existe un registro con el mismo código de alumno
    const { data: asistencias, error } = await supabase
      .from('asistencias')
      .select('codigo_asis_fk')
      .eq('codigo_asis_fk', codigoAlumno)
      .eq('fecha', fecha)
      .eq('nrc_asis_fk', nrcClase);

    // Manejar errores en la consulta
    if (error) {
      throw new Error("Hubo un problema al verificar la existencia del alumno.");
    }

    // Verificar si se encontró algún registro
    if (asistencias && asistencias.length > 0) {
      // Si se encontraron registros, establecer asistenciaTomada como verdadero
      asistenciaTomada = true;
    }

    // Si ya se tomó la asistencia para ese alumno, mostrar una alerta
    if (asistenciaTomada) {
      Alert.alert("Alerta", "Ya se ha tomado la asistencia para ese alumno.");
    } else {
      // Insertar el nuevo registro
      const { error: insertError } = await supabase.from('asistencias').insert([
        { codigo_asis_fk: codigoAlumno, fecha: fecha, hora: hora, nrc_asis_fk: nrcClase },
      ]);

      // Manejar errores en la inserción
      if (insertError) {
        throw new Error("Hubo un problema al registrar la asistencia.");
      }

      // Mostrar una alerta de éxito
      Alert.alert("Éxito", "La asistencia se registró correctamente.");
    }
  } catch (error) {
    // mostrar un mensaje de error
    Alert.alert("Error", error.message);
  }
};

// Exportar la función para registrar la hora de llegada
export { registrarHoraLlegada };
