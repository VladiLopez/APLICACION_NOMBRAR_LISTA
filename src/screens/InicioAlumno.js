// Importamos librerías y componentes necesarios

import { useNavigation, useRoute, useFocusEffect, useIsFocused} from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Button, Dimensions, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useClases } from "./ClasesContext";
import{handleBajaClaseAlumno} from "../backend/bajaClase";

/**
 * Componente funcional Inicio
 * 
 * @description Este componente representa la pantalla principal de la aplicación para un usuario.
 * Muestra una lista de clases con la opción de dar baja, agregar una nueva clase y ver detalles de una clase.
 * Utiliza un modal para confirmar la acción de dar de baja una clase.
 * 
 * @returns {JSX.Element} Elemento JSX que renderiza la pantalla principal.
 */


const Inicio = () => {
  // funciones y estado de navegación y contexto
  const route = useRoute();
  const navigation = useNavigation();

  const [lastScreen, setLastScreen] = useState("");
  const { clases, setClases, obtenerClases, codigoProfesor} = useClases();

  const codigoUsuario = codigoProfesor;

  console.log(codigoUsuario);

  // Funcion para manejar la navegación a la pantalla de agregar clase
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  // Funcion para manejar la navegación a la pantalla de agregar clase
  const handlePressAgregarClase = () => {
    navigation.push("AgregarClase");
  };

  // Función para manejar la navegación a la pantalla de una clase
  const handleClase = (item) => {
    navigation.push('Listado', {codigo: codigoUsuario});
  };

  const handleOpcionesClase = (item) => {
    setModalVisible(true);
    setSelectedClass(item);
  };

  // Funcion para manejar la accion de dar de baja una clase
  const handleDarDeBajaClase = () => {
    if (selectedClass) {
  
    const bajaNRC = selectedClass.NRC;
    handleBajaClaseAlumno(codigoUsuario, bajaNRC);
   
    setModalVisible(false);

    const nuevasClases = clases.filter((clase) => clase.NRC !== bajaNRC);
    setClases(nuevasClases);

  } else {
    console.log("No se ha seleccionado ninguna clase para eliminar.");
  }
    
  };

  // Fución para manejar la acción de modificar una clase
  const handleModificarClase = () => {
    // Lógica para modificar la clase seleccionada (selectedClass)
    setModalVisible(true);
  };

  // Componentes para agregar espacio entre el encabezado y la lista
  const HeaderSpacer = () => {
    return <View style={{ marginBottom: 15 }} />;
  };

  // Colores para las clases en la lista
  const colors = ["#83C809", "#099AC8", "#F73A5D", "#F7D53A", "#D796F3", "#96F3E9", "#F6A554", "#7D64FA", "#FFA6F4", "#F8FA64"];

   useEffect(() => {
      const unsubscribeFocus = navigation.addListener('focus', () => {
        // Llama a la función para obtener las clases del alumno cuando la pantalla se enfoca
        obtenerClases();
      });

      // Devuelve la función de limpieza para el evento de enfoque
      return unsubscribeFocus;
    }, [navigation, obtenerClases]);
  // Renderiza la interfaz de usuario
  return (
    <View style={styles.contenido}>
      <FlatList
        data={clases}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<HeaderSpacer />}

        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleClase(item)} style={[styles.estilo_clase, { backgroundColor: colors[index % colors.length] }]}>
            <TouchableOpacity onPress={() => handleOpcionesClase(item)} style={[styles.iconoClase]}>
              <Image
                source={require('../../img/tres_puntos.png')}
                style={styles.iconoClase}
              />
            </TouchableOpacity>
            <Text>{'\n'}</Text>
            <Text style={styles.textoClase}>Clase: {item.NombreClase}</Text>
            <Text style={styles.textoClase}>Seccion: {item.Seccion}</Text>
            <Text style={styles.textoClase}>Aula: {item.Aula}</Text>
            <Text style={styles.textoClase}>NRC: {item.NRC}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={handlePressAgregarClase} style={styles.icono_agregar_clase_container}>
        <Image source={require("../../img/agregar.png")} style={styles.icono_agregar_clase} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button title="Dar de baja" onPress={handleDarDeBajaClase} color='#3D2788'/>
            <View style={{ marginBottom: 15 }} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color='#3D2788'/>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

// Estilos asociados al componente
const styles = StyleSheet.create({
  contenido: {
    flex: 1,
    //backgroundColor: 'white',
    position: 'relative',
  },
  icono_agregar_clase_container: {
    position: "absolute",
    bottom: height * 0.05,
    right: width * 0.05,
    zIndex: 1,
  },
  icono_agregar_clase: {
    width: width * 0.2,
    height: width * 0.2,
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
  icono_cerrar_sesion: {
    width: width * 0.2,
    height: width * 0.2,
  },
  icono_cerrar_sesion_container: {
    position: "absolute",
    bottom: height * 0.05,
    left: width * 0.05,
    zIndex: 1,
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
  icono_camera: {
    width: width * 0.2,
    height: width * 0.2,
  },
  icono_camera_container: {
    position: "absolute",
    bottom: height * 0.05,
    left: width * 0.5 - (width * 0.1),
    zIndex: 2,
  },
});

// Exportamos el componente para ser usado en otra parte de la aplicación
export default Inicio;