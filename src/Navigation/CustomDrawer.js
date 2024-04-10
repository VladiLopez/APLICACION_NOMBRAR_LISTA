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

/**
 * Custom drawer component for the application.
 * 
 * This component renders the content displayed within the navigation drawer
 * It includes user profile information, a profile picture selection option
 * 
 * @param {object} props -React component properties passed from the parent component. 
 * @returns -The JSX element representing the custom drawer content
 */
const CustomDrawer = (props) => {
  // Access navigation object for programmatic navigation
  const navigation = useNavigation();

  // Access context data related to classes (implementation not shown)
  const { resetTipoUsuario, codigoProfesor } = useClases();

  // State variables for managing component behavior
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [usuario, setUsuario] = useState(null);

  // Function to log out the user, obtained from ClassesContext
  const { cerrarSesion } = useClases();

  /**
   * Saves the selected image URI to AsyncStorage with a key based on the user code.
   * 
   * @param {string} uri - The URI of the selected image 
   * @param {string} codigo - The user code. 
   */
  const saveSelectedImage = async (uri, codigo) => {
    try {
      await AsyncStorage.setItem(`selectedImage_${codigo}`, uri);
      setSelectedImage({ localUri: uri }); // Actualizar el estado de la imagen
    } catch (error) {
      console.error('Error saving selected image:', error);
    }
  };

  /**
   * Retrieves the stored image URI from AsyncStorage based on the user code.
   * 
   * @param {string} codigo - The user code. 
   */
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

  /**
   * handles opening the image picker, processing the selected image,
   * and uploading it to the database.
   */
  const openImagePickerAsync = async () => {
    // Request media library permissions
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

      // Copy the image to the app's document directory
      await FileSystem.copyAsync({
        from: localUri,
        to: newUri,
      });

      // Update component state with the new image
      setSelectedImage({ localUri: newUri });

      // Check for existing profile picture in the databases 
      const { data: previousImage, error: previousImageError } = await supabase
        .from('usuario_foto')
        .select('id, path')
        .eq('codigo_foto_fk', codigoProfesor)
        .single();

      // Fault tolerant, manage mistakes
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

      // succesfull case
      await altaFoto(codigoProfesor, newUri);
      console.log('Foto insertada correctamente en la base de datos');

      saveSelectedImage(newUri, usuario.Codigo); // Modificar para almacenar la imagen según el tipo de usuario
    } catch (error) {
      console.error('Error al convertir la URI a un archivo local:', error);
    }
  };

  /**
   * Handles loggin the user out by:
   * - Setting the isAuthenticated state to false.
   * Calling cerrarSesion from ClassContext to perform any loggout-related task there.
   * navigation to the Login screen.
   */
  const handleSignOut = () => {
    setIsAuthenticated(false);
    cerrarSesion();
    navigation.navigate('Login');
  };

  useEffect(() => {
    // If user is not authenticated, redirect to Login screen
    if (!isAuthenticated) {
      props.navigation.navigate('Login');
    }
    
    /**
     * Fetches user data and retrieves the storage profile picture URI.
     * This effect runs once on component mount and whenever
     * isAuthenticated or codigoProfesor changes.
     */
    const obtenerDatosUsuario = async () => {
      try {
        if (!codigoProfesor) {
          return;
        }
        
        // fetch user data from Supabase using codigoProfesor
        const { data, error } = await supabase
          .from('usuarios')
          .select('*')
          .eq('Codigo', codigoProfesor);
  
        // fault-tolerant, manages errors
        if (error) {
          console.error('Error al obtener los datos del usuario:', error);
          return;
        }
  
        // Update component state with user data if fetched successfully
        if (data && data.length > 0) {
          setUsuario(data[0]);
        }
      } catch (error) {
        console.error('Error general al interactuar con Supabase:', error);
      }
    };
  
    obtenerDatosUsuario();
    getSelectedImage(codigoProfesor);// Get stored profile picture URI
  }, [isAuthenticated, codigoProfesor]);

  // Render the component
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

// Export the file to be available to use in another part of the app
export default CustomDrawer;