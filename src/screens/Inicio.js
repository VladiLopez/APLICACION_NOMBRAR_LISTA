import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useClases } from "./ClasesContext"; // Importar el contexto de las clases
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importar Asyncstorage para almacenar el token de sesión.

/**
 * Componente Inicio: Muestra una lista de clases con opciones para editar, eliminar y agregar nuevas clases
 */
const Inicio = () => {
  const route = useRoute(); // Obtiene la ruta actual
  const navigation = useNavigation(); // Obtiene la navegación
  const { clases } = useClases();// Obtiene las clases del contexto

  const [isModalVisible, setModalVisible] = useState(false);// Estado para controlar la visibilidad del modal
  const [selectedClass, setSelectedClass] = useState(null);// Estado para almacenar la clase seleccionada

  /**
   * Navega a la pantalla de CrearClase
   */
  const handlePress = () => {
    navigation.push("CrearClase");
  };

  /**
   * Navega a la pantalla de ScannQR
   */
  const handlePressLogOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  /**
   * Navega a la pantalla ScannQR
   */
  const handlePressCamara = () => {
    navigation.push("ScannQR");
  };

  /**
   * Navega a la pantalla de Listado al hacer click en una clase-
   * @param {Object} item - Datos de la clase seleccionada. 
   */
  const handleClase = (item) => {
    navigation.push('Listado');
  };

  /**
   * Establece la clase seleccionada para eliminación y muestra el modal de confirmación.
   * @param {Object} item - Datos de la clase seleccionada.
   */
  const handleEliminarClase = (item) => {
    setSelectedClass(item);
    setModalVisible(true);
  };

  /**
   * Muestra el modal para modificar la clase seleccionada
   */
  const handleModificarClase = () => {
    // Lógica para modificar la clase seleccionada (selectedClass)
    setModalVisible(true);
  };

  /**
   * Componente para agregar un espacio entre la lista y el encabezado.
   */
  const HeaderSpacer = () => {
    return <View style={{ marginBottom: 15 }} />;
  };
  // Colores para las clases
  const colors = ["#83C809", "#099AC8", "#F73A5D", "#F7D53A", "#D796F3", "#96F3E9", "#F6A554", "#7D64FA", "#FFA6F4", "#F8FA64"];

  // Renderizamos el componente
  return (
    <View style={styles.contenido}>
      <FlatList
        data={clases}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<HeaderSpacer />}

        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleClase(item)} style={[styles.estilo_clase, { backgroundColor: colors[index % colors.length] }]}>
            <TouchableOpacity onPress={() => handleEliminarClase(item)} style={[styles.iconoClase]}>
              <Image
                source={require('../../img/tres_puntos.png')}
                style={styles.iconoClase}
              />
            </TouchableOpacity>

            <Text style={styles.textoClase}>Clase: {item.NombreClase}</Text>
            <Text style={styles.textoClase}>Seccion: {item.Seccion}</Text>
            <Text style={styles.textoClase}>Aula: {item.Aula}</Text>
            <Text style={styles.textoClase}>NRC: {item.NRC}</Text>

          </TouchableOpacity>
        )}
      />
      <TouchableOpacity onPress={handlePressLogOut} style={styles.icono_cerrar_sesion_container}>
        <Image source={require("../../img/log_out.png")} style={styles.icono_cerrar_sesion} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress} style={styles.icono_agregar_clase_container}>
        <Image source={require("../../img/agregar.png")} style={styles.icono_agregar_clase} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressCamara} style={styles.icono_camera_container}>
        <Image source={require("../../img/camara.png")} style={styles.icono_camera} />
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
            <Button title="Eliminar clase" onPress={handleEliminarClase} color='#3D2788'/>
            <View style={{ marginBottom: 15 }} />
            <Button title="Modificar clase" onPress={handleModificarClase} color='#3D2788'/>
            <View style={{ marginBottom: 15 }} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color='#3D2788'/>
          </View>
        </View>
      </Modal>

    </View>
  );
}

// Obtiene el ancho y el alto de la pantalla
const { width, height } = Dimensions.get('window');

// Estilos para los componentes
const styles = StyleSheet.create({
  contenido: {
    flex: 1,
    backgroundColor: '#D4BDFA',
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

// exportamos el componete para que sea utilizado en otras partes de la app
export default Inicio;