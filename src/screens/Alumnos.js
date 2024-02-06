import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

// Un componente personalizado para mostrar un círculo de color
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

// Un componente personalizado para mostrar una casilla de verificación
const Checkbox = ({checked}) => {
  return (
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
const Row = ({name, attendance}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>{name}</Text>
      <Circle color={attendance} />
    </View>
  );
};

// El componente principal que muestra la tabla completa
const Alumnos = ({ route }) => {
  // Recupera el nombre de la clase de los parámetros de navegación
  const { claseNombre } = route.params;

  // Los datos de los alumnos
  const students = [
    {name: 'Felipe Cisa', attendance: 'green'},
    {name: 'Mario Rincón', attendance: 'green'},
    {name: 'Marcelo Rios', attendance: 'red'},
    {name: 'Laura Rios', attendance: 'green'},
    {name: 'Ernesto Pérez', attendance: 'orange'},
    {name: 'Fili Acuña', attendance: 'green'},
    {name: 'Javier Martínez', attendance: 'orange'},
    {name: 'Maritza Guerrero', attendance: 'green'},
    {name: 'Gustavo L.', attendance: 'red'},
  ];

  return (
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

export default Alumnos;