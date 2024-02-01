import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useClases } from './ClasesContext';
import { obtenerUsuariosPorNRC, obtenerClasesPorNRCs } from "../backend/getRegistrosClases";

// Un componente para mostrar una fila de la tabla
const Row = ({ name, attendance, assignment }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{name}</Text>
      <Circle color={attendance} />
      <Checkbox checked={assignment} />
    </View>
  );
};

const Circle = ({color}) => {
  return (
    // Estilos asociados al componente
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

const Checkbox = ({checked}) => {
  return (
    // Estilos asociados al componente
    <View
      style={{
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {checked ? (
        <Image
          source={require('../../img/check.png')} // Una imagen local de un símbolo de verificación
          style={{width: 15, height: 15}}
        />
      ) : null}
    </View>
  );
};

// El componente principal que muestra la tabla completa
const Alumnos = () => {
  const { clases } = useClases(); // Asegúrate de importar useClases desde tu contexto
  const [nombresApellidos, setNombresApellidos] = useState([]);

  const route = useRoute();

  useEffect(() => {
    const cargarNombresApellidos = async () => {
      try {
        if (route.params && route.params.claseNRC) {
          const nrc = route.params.claseNRC;
          const codigosAlumnos = await obtenerUsuariosPorNRC(nrc);
          console.log('Códigos de alumnos asociados al NRC:', codigosAlumnos);

          const nombresApellidosData = await Promise.all(codigosAlumnos.map(async (alumno) => {
            try {
              console.log('Datos de usuario por código:', alumno);
              return alumno;
            } catch (error) {
              console.error('Error al obtener datos para el código de alumno', alumno, error);
              return null;
            }
          }));

          setNombresApellidos(nombresApellidosData.flat());
        }
      } catch (error) {
        console.error('Error al cargar nombres y apellidos:', error);
      }
    };

    cargarNombresApellidos();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tabla de asistencia{clases[0]?.nombreDeLaClase}</Text>
      <View style={styles.header}>
        <Text style={styles.name}>Alumno</Text>
      </View>
      {nombresApellidos.map((alumno, index) => (
        <Row
          key={index}
          name={`${alumno.Nombre} ${alumno.Apellidos}`}
          attendance={alumno.Asistencia}  // Asegúrate de tener estos campos en los datos del usuario
          assignment={alumno.Tarea}  // Asegúrate de tener estos campos en los datos del usuario
        />
      ))}
    </View>
  );
};

// Componentes de estilo y otras funciones necesarias aquí

// ... (los componentes Circle y Checkbox, así como los estilos)

// Estilos para el componente Alumnos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
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
});

export default Alumnos;
