import React, { useEffect, useState, useContext } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useClases } from "../screens/ClasesContext";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { supabase } from "../../Lib/supabase";


const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { resetTipoUsuario, codigoProfesor } = useClases(); // Obtener el código del profesor desde el contexto
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const { cerrarSesion } = useClases();

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('PERMISO NECESARIO');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.assets[0].uri });
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    cerrarSesion();
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // Aquí puedes redirigir al usuario a la pantalla de inicio de sesión
      props.navigation.navigate('Login');
    }
    
    const obtenerDatosUsuario = async () => {
      try {
        if (!codigoProfesor) {
          // Si el código del profesor no está definido, no realices la consulta
          return;
        }
        
        const { data, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('Codigo', codigoProfesor); // Utiliza el código del profesor obtenido del contexto de ClasesProvider
  
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
  }, [isAuthenticated, codigoProfesor]); // Asegúrate de incluir `codigoProfesor` en la lista de dependencias para que se ejecute la consulta cada vez que cambie
  
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#8200d6' }}
      >
        <ImageBackground
          source={require('../../img/menu-bg.jpeg')}
          style={{ padding: 20 }}
        >
          <TouchableOpacity onPress={openImagePickerAsync}>
            <Image
              source={
                selectedImage !== null
                  ? { uri: selectedImage.localUri }
                  : require('../../img/usuario.png')
              }
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}
          >
            {usuario && `${usuario.Nombre} ${usuario.Apellidos}`} 
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}
          >
            {usuario && usuario.Codigo}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}
      >
        <TouchableOpacity onPress={handleSignOut} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Cerrar sesión
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;