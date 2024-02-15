import React, { useState, useEffect, useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ClasesContext } from "./ClasesContext";
import { supabase } from "../../Lib/supabase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

const PerfilProfesor = () => {
  const { codigoProfesor } = useContext(ClasesContext);
  const [usuario, setUsuario] = useState(null);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      try {
        if (!codigoProfesor) return;

        const { data, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('Codigo', codigoProfesor);

        if (error) {
          console.error('Error al obtener los datos del usuario:', error);
          return;
        }

        if (data && data.length > 0) {
          setUsuario(data[0]);
          // Obtener la foto de perfil del usuario según el tipo
          const foto = await AsyncStorage.getItem(`selectedImage_${codigoProfesor}`);
          if (foto) {
            setFotoPerfil(foto);
          } else {
            setFotoPerfil(data[0].path); // Fallback a la imagen de la base de datos
          }
        }
      } catch (error) {
        console.error('Error general al interactuar con Supabase:', error);
      }
    };

    obtenerDatosUsuario();
  }, [codigoProfesor]); // Solo codigoProfesor en la lista de dependencias

  const handleEditarPerfil = async () => {
    await navigation.navigate('EditarPerfil');
    obtenerDatosUsuario();
    // Después de editar el perfil, volvemos a cargar la imagen de perfil
    const foto = await AsyncStorage.getItem(`selectedImage_${codigoProfesor}`);
    if (foto) {
      setFotoPerfil(foto);
      navigation.push('EditarPerfil');
    }
  };

  return (
    <View style={styles.contenido}>
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={fotoPerfil ? { uri: fotoPerfil } : require('../../img/usuario.png')} // Usar la foto de perfil del usuario si está disponible
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

export default PerfilProfesor;