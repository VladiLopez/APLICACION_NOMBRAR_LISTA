import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useClases } from './ClasesContext';
import { getCodigos, getAsistencias, getDatosAsistencias } from "../backend/getRegistrosClases";
import DateTimePicker from '@react-native-community/datetimepicker';

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



const Row = ({ name, horaAsistencia, horaInicio }) => {
  const [color, setColor] = useState(null);

  useEffect(() => {
    const calcularColor = () => {
      console.log(horaInicio);
      console.log(horaAsistencia);

      const horaInicioFormateada = formatHora(horaInicio);
      const horaAsistenciaFormateada = formatHora(horaAsistencia);

      console.log(horaInicioFormateada);
      console.log(horaAsistenciaFormateada);


      const horaInicioMinutos = horaInicioFormateada.getHours() * 60 + horaInicioFormateada.getMinutes();
      const horaAsistenciaMinutos = horaAsistenciaFormateada.getHours() * 60 + horaAsistenciaFormateada.getMinutes();

      const diferenciaMinutos = horaAsistenciaMinutos - horaInicioMinutos;

      console.log(diferenciaMinutos);

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


  return (
    <View style={styles.row}>
      <Text style={styles.name}>{name}</Text>
      <Circle color={color} />
    </View>
  );
};


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
  const [nombresApellidos, setNombresApellidos] = useState([]);
  const [horas, setHoras] = useState([]); // Nuevo estado para almacenar las horas de llegada de los alumnos
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const route = useRoute();

  const hora_inicio = route.params.hora;

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

 useEffect(() => {
    const cargarDatosPorFecha = async () => {
      try {
        const nrc = route.params.claseNRC;
        const fecha = formatDate(selectedDate);
        const asistencias = await getAsistencias(fecha, nrc);
        setNombresApellidos(asistencias);

        const horasAsistencias = await getCodigos(fecha, nrc);
        setHoras(horasAsistencias); // Asegúrate de que se pasen correctamente las horas al estado 'horas'
      } catch (error) {
        console.error('Ocurrió un error al obtener asistencias:', error);
      }
    };

    cargarDatosPorFecha();
  }, [selectedDate]);

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

export default Alumnos;
