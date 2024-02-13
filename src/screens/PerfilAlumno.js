import React, { useState, useEffect, useContext } from "react";
import { Image, StyleSheet, Text, View} from "react-native";
import { ClasesContext } from "./ClasesContext";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import { supabase } from "../../Lib/supabase";

const PerfilAlumno = () => {
  const [image, setImage] = useState(null);
  const { codigoProfesor } = useContext(ClasesContext);
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);

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
        }
      } catch (error) {
        console.error('Error general al interactuar con Supabase:', error);
      }
    };

    obtenerDatosUsuario();
  }, [codigoProfesor]);

  const handleEditarPerfil = () => {
    navigation.push('EditarPerfil');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.contenido}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.imageContainer}>
            {image ? (
              <Image
                style={styles.profileImage}
                source={{ uri: image }}
              />
            ) : (
              <Image
                style={styles.profileImage}
                source={require('../../img/usuario.png')}
              />
            )}
          </View>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.customButton} onPress={handleEditarPerfil}>
          <Text style={styles.customButtonText}>Editar perfil</Text>
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
    alignItems: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginTop: '60%',
  },
  profileImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  containerText: {
    alignItems: 'center',
    width: '100%',
    height: '40%',
  },
  name: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 120,
    textAlign: 'center',
  },
  code: {
    textAlign: 'center',
    fontSize: 29,
    marginTop: 10,
  },
  containerButton: {
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  customButton: {
    backgroundColor: '#3D2788',
    marginTop: '10%',
    width: 200,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },
  customButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: 'center',
    color: 'white',
  }
});

export default PerfilAlumno;
