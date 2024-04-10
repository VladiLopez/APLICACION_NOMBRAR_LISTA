/**
 * Este componente renderiza una tabla de asistencia para una clase especifica, permitiendo al usuario seleccionar una fecha y ver la lista de alumnos que asistieron a esa clase en esa fechs.
 * 
 * Cada fila de la tabla muestra el nombre del alumno y la hora en que registraron su asistencia, con colores diferentes según su puntualidad.
 */

/**
 * Componente funcional Alumnos.
 * 
 * @description Este componente muestra una tabla de asistencia para una clase especifica.
 * 
 * Permite al usuario seleccionar una fecha y ver la lista de alumnos que asistieron a esa clase en esa fecha.
 * La tabla muestra el nombre del alumno y la hora en que registraron su asistencia, con colores diferentes según la puntualidad.
 * 
 * @returns {JSX.Element} Elemento JSX que renderiza la tabla de asistencia de los alumnos.
 */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useClases } from './ClasesContext';
import { getCodigos, getAsistencias, getDatosAsistencias } from "../backend/getRegistrosAsistencias";
import DateTimePicker from '@react-native-community/datetimepicker';

// Función para formatear la hora en formato de 24 horas
const formatHora = (horaString) => {
  try {
    const [hour, minute] = horaString.split(":").map(part => parseInt(part));
    let hour24 = hour;
    // Convertir a formato de 24 horas si la hora es PM
    if (horaString.toLowerCase().includes("pm") && hour !== 12) {
      hour24 += 12;
    }
    return new Date(0, 0, 0, hour24, minute);
  } catch (error) {
    console.error('Error al formatear la hora:', error);
    return null;
  }
};

// Componente funcional para cada fila de la tabla asistencia
const Row = ({ name, horaAsistencia, horaInicio }) => {
  const [color, setColor] = useState(null);

  useEffect(() => {
    const calcularColor = () => {

      const horaInicioFormateada = formatHora(horaInicio);
      const horaAsistenciaFormateada = formatHora(horaAsistencia);
      const horaInicioMinutos = horaInicioFormateada.getHours() * 60 + horaInicioFormateada.getMinutes();
      const horaAsistenciaMinutos = horaAsistenciaFormateada.getHours() * 60 + horaAsistenciaFormateada.getMinutes();

      const diferenciaMinutos = horaAsistenciaMinutos - horaInicioMinutos;

      if (diferenciaMinutos <= 15) {
        return 'green'; 
      } else if (diferenciaMinutos <= 60) {
        return 'yellow'; 
      } else {
        return 'red'; 
      }
    };

    const color = calcularColor();
    setColor(color);
  }, [horaAsistencia, horaInicio]);

  if (color === null) {
    // Renderizar un componente de carga mientras se calcula el color
    return <ActivityIndicator />;
  }

  // Renderiza el componente
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{name}</Text>
      <Circle color={color} />
    </View>
  );
};

// Componente funcional para el circulo que indica la puntualidad
const Circle = ({color}) => {
  return (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: color,
      }}
    />
  );
};

const Alumnos = () => {
  const { clases } = useClases(); 
  const [nombresApellidos, setNombresApellidos] = useState([]); // Estado para almacenar los nombres y apellidos de los alumnos
  const [horas, setHoras] = useState([]); // Nuevo estado para almacenar las horas de llegada de los alumnos
  const [showDatePicker, setShowDatePicker] = useState(false);// Estado para mostrar el selector de fecha
  const [selectedDate, setSelectedDate] = useState(new Date()); // Estado para almacenar la fecha seleccionada
  const route = useRoute();

  // Obtener la hora de inicio de la clase desde las rutas
  const hora_inicio = route.params.hora;

  // Función para formatear la fecha en el formato YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

// Efecto secundario para cargar los datos de asistencia por fecha al cargar el componente o al cambiar la fecha seleccionada
 useEffect(() => {
    const cargarDatosPorFecha = async () => {
      try {
        const nrc = route.params.claseNRC;// Obtener el NRC de la clase desde las rutas
        const fecha = formatDate(selectedDate);// Formatear la fecha seleccionada
        const asistencias = await getAsistencias(fecha, nrc);// Obtener los datos de asistencia para la fecha y el NRC especificos
        setNombresApellidos(asistencias);// Establecer los nombres y apellidos de los alumnos

        const horasAsistencias = await getCodigos(fecha, nrc);// Obtener las horas de llegada de los alumnos
        setHoras(horasAsistencias); // Asegúrate de que se pasen correctamente las horas al estado 'horas'
      } catch (error) {
        console.error('Ocurrió un error al obtener asistencias:', error);
      }
    };

    cargarDatosPorFecha();// Llamar a la función para cargar los datos de asistencia por fecha
  }, [selectedDate]); // Dependencia: la fecha seleccionada

  // Renderizamos el componente
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabla de asistencia {clases[0]?.nombreDeLaClase}</Text>

      <TouchableOpacity 
            style={[styles.customButton]} 
            onPress={() => setShowDatePicker(true)} 
          >
          <Text style={styles.customButtonText}>Seleccionar Fecha</Text>
        </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, newDate) => {
            const currentDate = newDate || selectedDate;
            setShowDatePicker(Platform.OS === 'ios');
            setSelectedDate(currentDate);
          }}
        />
      )}
      <View style={styles.header}>
        <Text style={styles.name}>Alumno</Text>
      </View>
      {nombresApellidos.map((usuario, index) => (
        <Row
          key={index}
          name={`${usuario.Nombre} ${usuario.Apellidos}`}
          horaAsistencia={horas[index] ? horas[index] : ''} // Asegurar que la hora de asistencia esté definida
          horaInicio={hora_inicio} // Asegurar que la hora de inicio esté definida
        />
      ))}
    </View>
  );
};

// Estilos asociados al componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  customButton: {
    width: '40%',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D2788',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },
  customButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// Exportar el componente para que pueda ser utilizado en otras partes de la app
export default Alumnos;
