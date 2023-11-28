import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, FlatList, Modal, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useClases } from "./ClasesContext";
import ModificarClase from "./ModificarClase";

const Inicio = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { clases } = useClases();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const handlePress = () => {
    navigation.push("CrearClase");
  };

  const handlePressCamara = () => {
    navigation.push("ScannQR");
  };

  const handleOpcionesClase = (item) => {
    setModalVisible(true);
    setSelectedClass(item);
  };

  const handleEliminarClase = () => {
    navigation.push()
    setModalVisible(true);
  };

  const handleModificarClase = () => {
    if (selectedClass) {
      // Navegar a la pantalla 'ModificarClase' y pasar el ID de la clase seleccionada como parámetro
      navigation.navigate('ModificarClase', { claseId: selectedClass.id });
      setModalVisible(false);
    } else {
      console.log("No se ha seleccionado ninguna clase para modificar.");
    }
  };

  const HeaderSpacer = () => {
    return <View style={{ marginBottom: 15 }} />;
  };

  const colors = ["#83C809", "#099AC8", "#F73A5D", "#F7D53A", "#D796F3", "#96F3E9", "#F6A554", "#7D64FA", "#FFA6F4", "#F8FA64"];

  return (
    <View style={styles.contenido}>
      <FlatList
        data={clases}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={<HeaderSpacer />}

        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handlePressCamara(item)} style={[styles.estilo_clase, { backgroundColor: colors[index % colors.length] }]}>
            <TouchableOpacity onPress={() => handleOpcionesClase(item)} style={[styles.iconoClase]}>
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
      <TouchableOpacity onPress={handlePress} style={styles.icono_agregar_clase_container}>
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

const { width, height } = Dimensions.get('window');

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

export default Inicio;