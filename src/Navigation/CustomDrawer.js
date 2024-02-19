// CustomDrawer.js
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useClases } from "../screens/ClasesContext";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { altaFoto } from "../backend/altaFoto";
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from "../../Lib/supabase";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { resetTipoUsuario, codigoProfesor } = useClases();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const { cerrarSesion } = useClases();

  const saveSelectedImage = async (uri, codigo) => {
    try {
      await AsyncStorage.setItem(`selectedImage_${codigo}`, uri);
      setSelectedImage({ localUri: uri }); // Actualizar el estado de la imagen
    } catch (error) {
      console.error('Error saving selected image:', error);
    }
  };

  const getSelectedImage = async (codigo) => {
    try {
      const uri = await AsyncStorage.getItem(`selectedImage_${codigo}`);
      if (uri !== null) {
        setSelectedImage({ localUri: uri });
      }
    } catch (error) {
      console.error('Error getting selected image:', error);
    }
  };

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

    try {
      const selectedAsset = pickerResult.assets[0];
      const localUri = selectedAsset.uri;
      const filename = localUri.split('/').pop();
      const newUri = FileSystem.documentDirectory + filename;

      await FileSystem.copyAsync({
        from: localUri,
        to: newUri,
      });

      setSelectedImage({ localUri: newUri });

      const { data: previousImage, error: previousImageError } = await supabase
        .from('usuario_foto')
        .select('id, path')
        .eq('codigo_foto_fk', codigoProfesor)
        .single();

      if (previousImageError) {
      } else if (previousImage) {
        await supabase
          .from('usuario_foto')
          .delete()
          .eq('id', previousImage.id);
        console.log('Imagen anterior eliminada correctamente de la base de datos');
      } else {
        console.log('No hay imagen anterior para este usuario');
      }

      await altaFoto(codigoProfesor, newUri);
      console.log('Foto insertada correctamente en la base de datos');

      saveSelectedImage(newUri, usuario.Codigo); // Modificar para almacenar la imagen según el tipo de usuario
    } catch (error) {
      console.error('Error al convertir la URI a un archivo local:', error);
    }
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    cerrarSesion();
    navigation.navigate('Login');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      props.navigation.navigate('Login');
    }
    
    const obtenerDatosUsuario = async () => {
      try {
        if (!codigoProfesor) {
          return;
        }
        
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
    getSelectedImage(codigoProfesor);
  }, [isAuthenticated, codigoProfesor]);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#8200d6' }}>
        <ImageBackground source={require('../../img/menu-bg.jpeg')} style={{ padding: 20 }}>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <Image
              source={selectedImage ? { uri: selectedImage.localUri } : require('../../img/usuario.png')}
              style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
            />
          </TouchableOpacity>
          <Text style={{ color: '#fff', fontSize: 18, marginBottom: 5 }}>
            {usuario && `${usuario.Nombre} ${usuario.Apellidos}`}
          </Text>
          <Text style={{ color: '#fff', fontSize: 18, marginBottom: 5 }}>
            {usuario && usuario.Codigo}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={handleSignOut} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Cerrar sesión</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;