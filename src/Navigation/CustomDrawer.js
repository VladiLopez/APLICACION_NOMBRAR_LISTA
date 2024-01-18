// Importamos librerias y todos los componentes necesarios


import React, { useEffect, useState } from 'react';
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

import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawer = props => {
  // Estado para gestionar la autenticación del usuario
 const [isAuthenticated, setIsAuthenticated] = useState(true);
 // Estado para almacenar la imagen seleccionada
 const [selectedImage, setSelectedImage] = useState(null);

 /**
  * @async
  * @function
  * @returns { Promise<void>} Promesa que indica la finalizacion de la operación
  */
 let openImagePickerAsync = async () => {
  // Solictamos permisos para acceder a la biblioteca de medios
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
  
  // Verificar se se otorgaron los permisos.
  if (permissionResult.granted === false){
    // Alertar al usuario sobre la necesidad de permisos.
    alert('PERMISO NECESARIO');
    return;

    // Resto de la lógica para la selección de imagenes.
    // ...
  }

  // Obtenemos la seleccion de imagenes desde la biblioteca
  const pickerResult = await ImagePicker.launchImageLibraryAsync()
  
  // verificamos si la seleccion fue cancelada por el usuario
  if(pickerResult.canceled === true){
    return;
  }

  // Se establece la imagen seleccionada en el estado
  setSelectedImage({ localUri: pickerResult.assets[0].uri });
 }
 /**
  * Funcion para manejar el cierre d sesión del usuario.
  * 
  * @function
  * @return { void }
  */

 const handleSignOut = () => {
    // Aquí puedes borrar los datos de inicio de sesión del usuario
    setIsAuthenticated(false);
 };
 /**
  * Efecto secundario para redirigir al usuario a la pantalla de inicio de sesión
  * si no esta autenticado
  */

 useEffect(() => {
    if (!isAuthenticated) {
      // Aquí puedes redirigir al usuario a la pantalla de inicio de sesión
      props.navigation.navigate('Login');
    }
 }, [isAuthenticated]);

 return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        <ImageBackground
          source={require('../../img/menu-bg.jpeg')}
          style={{padding: 20}}>
           <TouchableOpacity onPress={openImagePickerAsync}>  
            <Image
              source={selectedImage !== null ? { uri: selectedImage.localUri } : require('../../img/usuario.png')}
              style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            Jared Mandujano López
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            218556767
          </Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={handleSignOut} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Cerrar sesión
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
 );
};

export default CustomDrawer;