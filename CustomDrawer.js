import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Image, ImageBackground, PixelRatio, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
/*
    Se requiere obtener de la base de datos la foto de perfil del usuario
    Su usuario y apellidos para mostrarse en la navegacion
    Y utilizar su id en las diferentes vistas
*/
const CustomDrawer = (props) => {
  const { navigation } = props;
  //const DrawerPhoto = "../assets/drawerWallpaper.png";
  //const imageUrl = require('../assets/Sample/Patient.jpeg');
  const UserName = "Vicente Gonzalez Garcia";

  //Cerrar sesión
  const handleLogout = () => {
    navigation.navigate('Login');
  };
  //Tamaño responsivo para el fondo y la foto de perfil
  const fondoHeightResponsive = PixelRatio.getPixelSizeForLayoutSize(50);
  const fondoWidthResponsive = PixelRatio.getPixelSizeForLayoutSize(110);

  const fotoHeightResponsive = PixelRatio.getPixelSizeForLayoutSize(25);
  const fotoWidthResponsive = PixelRatio.getPixelSizeForLayoutSize(25);

  // Renderizamos el componente
  return (
    <View style={{flex:1}}>
        <DrawerContentScrollView
            {...props}
            contentContainerStyle= {{backgroundColor: "#45C3CC"}}>
        <ImageBackground
        //source={require(DrawerPhoto)}
        style={{padding: 30, height: fondoHeightResponsive, width: fondoWidthResponsive}}>
            <Image
            //source={imageUrl}
            style={[styles.userPhoto,{height: fotoHeightResponsive, width: fotoWidthResponsive}]}
            ></Image>
            <Text style={styles.textName}>{UserName}</Text>
        </ImageBackground>
        <View style={styles.lista}>
            <DrawerItemList {...props} />
        </View>
        </DrawerContentScrollView>
        <TouchableOpacity onPress={handleLogout}>
            <View style={styles.logout}>
            <Icon name='log-out-outline' size={28} color ={"black"}></Icon>
            <Text style={styles.textLogout}>Cerrar Sesión</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

// exportamos los estilos definidos por las clases para desplegar los elementos visuales.
export default CustomDrawer
const styles = StyleSheet.create({
    textLogout:{
        marginLeft: "5%",
        marginTop: "1%",
        fontWeight: "bold",
        fontSize: 18,
    },
    logout:{
        padding: "10%",
        paddingTop: "5%",
        flexDirection: "row",
    },
    lista:{
        flex: 1,
        backgroundColor: "#fff"
    },
    userPhoto: {
        borderRadius: 40,
        marginLeft: "-2%",
        marginTop: "-3%",
    },
    textName: {
        position: "absolute",
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        left: "15%",
        top: "125%",
    },
});