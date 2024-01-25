// Importamos los componentes necesarios 

import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

/**
 * @component
 * Pantalla que muestra el perfil de un profesor.
 */
const PerfilProfesor = () => {
  const navigation = useNavigation();

  /**
   * Navega a la pantalla de edición de perfil cuando se presiona el botón "Editar perfil".
   * @function
   */
  const handleEditarPerfil = () => {
    navigation.push('EditarPerfil');
  };

  // Renderiza la interfaz de usuario
  return (
    <View style={styles.contenido}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={require('../../img/usuario.png')}
          />
        </View>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.name}>
            Jared Mandujano López Monje
        </Text>
        <Text style={styles.code}>
            259675322
        </Text>
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.Button} onPress={handleEditarPerfil}>
          <Text style={styles.TextButton}>Editar perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * Estilos para la pantalla de perfil del profesor.
 * @constant {Object}
 */
const styles = StyleSheet.create({
  contenido: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  header: {
    backgroundColor: '#6956A5',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginTop: '40%',
  },
  profileImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  containerText: {
    alignItems: 'center', // Centra el contenido horizontalmente
    width: '100%',
    height: '40%',
  },
  name: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 90,
    textAlign: 'center',
  },
  code: {
    textAlign: 'center',
    fontSize: 29,
    marginTop: 10,
  },
  containerButton:{
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  Button:{
    backgroundColor: '#3D2788',
    marginTop: '10%',
    width: 200,
    height: 50,
    borderRadius: 10
  },
  TextButton:{
    fontSize: 25,
    fontWeight: "bold",
    textAlign: 'center', 
    marginTop: 7,
    color: 'white'
  }
});

// Exportamos el componente para ser usado en otra parte de la aplicación
export default PerfilProfesor;
