import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useClases } from "./ClasesContext";

/**
 * Componente funcional ListadoAsistencia.
 * 
 * @description Este componente representa la pantalla de listado de clases para tomar asistencia.
 * Al seleccionar una clase, se navega a la pantalla 'Alumnos' pasando el nombre de la clase como parámetro.
 * 
 * @returns {JSX.Element} Elemento JSX que renderiza la pantalla de listado de clases para tomar asistencia.
 */
const ListadoAsistencia = () => {
  const navigation = useNavigation();
  const { clases } = useClases();

  /**
   * Maneja el evento de selección de una clase.
   * Navega a la pantalla 'Alumnos' pasando el nombre de la clase como parámetro.
   * 
   * @param {object} item - Objeto que representa la clase seleccionada.
   */
  const handleClase = (item) => {
    // Pasa el nombre de la clase como parámetro a la pantalla 'Alumnos'
    navigation.push('Alumnos', { claseNombre: item.NombreClase });
  };
  /**
   * Componente funcional para añadir espacio en la parte superior de la lista.
   * 
   * @returns {JSX.Element} Elemento JSX que representa el espacio en la parte superior de la lista.
   */
  const HeaderSpacer = () => {
    return <View style={{ marginBottom: 15 }} />;
  };

  // Colores para alternar el fondo de las clases en la lista
  const colors = ["#83C809", "#099AC8", "#F73A5D", "#F7D53A", "#D796F3", "#96F3E9", "#F6A554", "#7D64FA", "#FFA6F4", "#F8FA64"];

  // Renderiza la interfaz de usuario
  return (
    <View style={styles.contenido}>
      <FlatList
        data={clases}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<HeaderSpacer />}

        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleClase(item)} style={[styles.estilo_clase, { backgroundColor: colors[index % colors.length] }]}>
            <Text style={styles.textoClase}>{item.NombreClase}</Text>
            <Text style={styles.textoClase}>Seccion: {item.Seccion}</Text>
            <Text style={styles.textoClase}>Aula: {item.Aula}</Text>
            <Text style={styles.textoClase}>NRC: {item.NRC}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Dimensiones de la ventaja
const { width, height } = Dimensions.get('window');

// Estilos asociados al componente
const styles = StyleSheet.create({
  contenido: {
    flex: 1,
    //backgroundColor: '#D4BDFA',
    position: 'relative',
  },
  estilo_clase: {
    borderRadius: 20,
    width: '90%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  textoClase: {
    color: "black",
    fontSize: 25,
    fontWeight: 'bold',
  },
  iconoClase: {
    position: 'absolute',
    top: 0,
    right: 15,
    width: 40,
    height: 40,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

// Exportamos el componente para ser usado en otra parte de la aplicación
export default ListadoAsistencia;
