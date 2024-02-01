/**
 * Componente CustomDrawer
 * Este componente personalizado define la apariencia del 
 * cajon de navegacion lateral ( drawer ).
 * Utilizado en la aplicacion. Contiene elementos visuales, animaciones y funcionalidades especificas, como
 * la seleccion de imagenes de perfil y la opcion para
 * cerrar sesion
 */
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useClases } from "../screens/ClasesContext";

/**
 * Funcion CustomDrawer
 * @param { object } props - Propiedades del componente proporcionadas por React Navigation.
 * @returns { JSX.Element } - Elemento JSX que representa el cajon de navegación personalizado.
 */
const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { resetTipoUsuario } = useClases();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const { cerrarSesion } = useClases();

  /**
   * Abre la biblioteca de medios para seleccionar una imagen de perfil
   */
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

  /**
   * Maneja la accion de cerrar sesion.
   * Realiza las acciones necesarias para cerrar la sesion
   * del usuario.
   */
  const handleSignOut = () => {
    setIsAuthenticated(false);
    resetTipoUsuario();
    cerrarSesion();
    navigation.navigate('Login');
  };

  /**
   * Efecto secundario que redirige al usuario a la pantalla de inicio de sesion
   * si no esta autenticado.
   */
  useEffect(() => {
    if (!isAuthenticated) {
      // Aquí puedes redirigir al usuario a la pantalla de inicio de sesión
      props.navigation.navigate('Login');
    }
 }, [isAuthenticated]);


  /**
   * Renderizamos el componente
   */
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
            Jared Mandujano López
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}
          >
            218556767
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

/**
 * Exportamos el componente para que pueda ser usado en otra parte de la aplicacion
 */
export default CustomDrawer;
