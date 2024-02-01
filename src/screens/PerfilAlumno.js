// Liberías y modulos necesarios

import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ClasesContext } from "./ClasesContext";
import { supabase } from "../../Lib/supabase";

const PerfilProfesor = () => {
  const navigation = useNavigation();
  const { codigoProfesor } = useContext(ClasesContext);
  const [usuario, setUsuario] = useState(null);

  /**
   * Maneja el evento de modificar el perfil.
   * Actualiza el estado de clases con los nuevos detalles de los perfiles modificados.
   * Navega de nuevo a la pantalla de inicio.
   */
  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        // Verifica que el código del profesor no esté vacío
        if (!codigoProfesor) return;

        // Realiza la consulta a la base de datos para obtener los datos del usuario
        const { data, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('Codigo', codigoProfesor);

        // Maneja el error en caso de que ocurra
        if (error) {
          console.error('Error al obtener los datos del usuario:', error);
          return;
        }

        // Actualiza el estado con los datos del usuario obtenidos
        if (data && data.length > 0) {
          setUsuario(data[0]);
        }
      } catch (error) {
        console.error('Error general al interactuar con Supabase:', error);
      }
    };

    // Llama a la función para obtener los datos del usuario
    obtenerDatosUsuario();
  }, [codigoProfesor]); // Asegúrate de incluir codigoProfesor en la lista de dependencias

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
        {usuario && `${usuario.Nombre} ${usuario.Apellidos}`}
        </Text>
        <Text style={styles.code}>
          {usuario && usuario.Codigo}
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

// Estilos asociados al componente
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