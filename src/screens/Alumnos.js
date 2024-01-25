// Importamos librerías y componentes necesarios para funcionalidades y estilos

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// Un componente personalizado para mostrar un círculo de color
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

// Un componente personalizado para mostrar una casilla de verificación
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

// Un componente para mostrar una fila de la tabla
const Row = ({name, attendance, assignment}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{name}</Text>
      <Circle color={attendance} />
      <Checkbox checked={assignment} />
    </View>
  );
};

  // El componente principal que muestra la tabla completa
const Alumnos = ({ route }) => {
  // Recupera el nombre de la clase de los parámetros de navegación
  const { claseNombre } = route.params;

  // Los datos de los alumnos
  const students = [
    {name: 'Felipe Cisa', attendance: 'green', assignment: true},
    {name: 'Mario Rincón', attendance: 'green', assignment: true},
    {name: 'Marcelo Rios', attendance: 'red', assignment: false},
    {name: 'Laura Rios', attendance: 'green', assignment: true},
    {name: 'Ernesto Pérez', attendance: 'orange', assignment: true},
    {name: 'Fili Acuña', attendance: 'green', assignment: true},
    {name: 'Javier Martínez', attendance: 'orange', assignment: true},
    {name: 'Maritza Guerrero', attendance: 'green', assignment: true},
    {name: 'Gustavo L.', attendance: 'red', assignment: false,
  },
  ];

  return (
    // Renderiza la interfaz del usuario
    <View style={styles.container}>
      <Text style={styles.title}>Tabla de asistencia - {claseNombre}</Text>
      <View style={styles.header}>
        <Text style={styles.name}>Alumno</Text>
      </View>
      {students.map((student, index) => (
        <Row
          key={index}
          name={student.name}
          attendance={student.attendance}
          assignment={student.assignment}
        />
      ))}
    </View>
  );
};

// Los estilos para los componentes
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
  attendance: {
    width: 20,
    textAlign: 'center',
  },
  assignment: {
    width: 20,
    textAlign: 'center',
  },
});

// Exportamos el componente para su uso en otras partes de la aplicación
export default Alumnos;