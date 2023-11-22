import React, { useState, useEffect } from 'react';
import {
 View,
 Text,
 ImageBackground,
 Image,
 TouchableOpacity,
} from 'react-native';
import {
 DrawerContentScrollView,
 DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const CustomDrawer = props => {
 const [isAuthenticated, setIsAuthenticated] = useState(true);
 const [userImage, setUserImage] = useState(require('../../img/usuario.png'));

 const handleSignOut = () => {
    // Aquí puedes borrar los datos de inicio de sesión del usuario
    setIsAuthenticated(false);
 };

 const changeUserImage = () => {
  // Lógica para cambiar la imagen de usuario desde la galería
  // Puedes usar una librería como react-native-image-picker
  // para seleccionar imágenes desde la galería.
  // Aquí solo actualizo la imagen de ejemplo.
  setUserImage(require('../../img/usuario.png'));
};

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
           <TouchableOpacity onPress={changeUserImage}>
            <Image
              source={userImage}
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