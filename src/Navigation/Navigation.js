// Importamos los modulos y librerias necesarias

import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomDrawer from '../Navigation/CustomDrawer.js';

// Pantallas usadas en la navegacion
import CerrarSesión from '../../Login.js';
import AcercaDe from '../screens/AcercaDeNosotros.js';
import Inicio from '../screens/Inicio.js';

/**
 * Drawer Navigation Instance
 * 
 * Instancia del Drawer navigator creada mediante la funcion createDrawerNavigator.
 * Se utiliza para gestionar la navegación tipo drawer en la aplicación.
 */
const Drawer = createDrawerNavigator();

const Navigation = () => {
  return (
    <>
      <Drawer.Navigator drawerContent= {props=> <CustomDrawer {...props}/>} initialRouteName="Dashboard" screenOptions={{
        // Configuración de los aspectos para dar estilo
        headerTitle: '',
        backgroundColor: "#45C3CC",
        drawerActiveBackgroundColor: "#45C3CC",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
        drawerStyle: {
          backgroundColor: '#FFFF',
        },
        drawerLabelStyle:{
          fontWeight: "bold",
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: '#45C3CC', // Cambiar el color de fondo del encabezado
        },
      }}
      >
        <Drawer.Screen name="Inicio" component={Inicio} options={{
          // Pantalla de inicio y establecimieto de estilos
          drawerIcon: (color) => (
            <Icon name='home-outline' size={26} color ={color}></Icon>
          )
        }
        }/>
        <Drawer.Screen name="Acerca de nosotros" component={AcercaDe} options={{
          // Pantalla de About Us y establecimieto de estilos
          drawerIcon: (color) => (
            <Icon name='medical-outline' size={26} color ={color}></Icon>
          ),
        }
        }/>
        <Drawer.Screen name="Cerrar sesión" component={CerrarSesión} options={{
          // Pantalla de Cerrar sesión y establecimieto de estilos
          drawerIcon: (color) => (
            <Icon name='list-outline' size={26} color ={color}></Icon>
          ),
        }
        }/>
      </Drawer.Navigator>
    </>
  );
};

// Exportramos todo el contenido
export default Navigation;