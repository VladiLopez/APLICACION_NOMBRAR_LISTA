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
import { useNavigation } from '@react-navigation/native';
import { useClases } from "../screens/ClasesContext";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { resetTipoUsuario } = useClases();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

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
 }, [isAuthenticated]);


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

export default CustomDrawer;
