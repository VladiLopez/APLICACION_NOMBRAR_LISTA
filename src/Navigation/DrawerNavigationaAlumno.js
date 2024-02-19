// Importamos los modulos y librerías necesarias

import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawer from '../Navigation/CustomDrawer.js';

import Ionicons from 'react-native-vector-icons/Ionicons';

import MessagesScreen from '../screens/AcercaDeNosotros.js';
import HomeScreen from '../screens/InicioAlumno.js';
import ProfileScreen from '../screens/PerfilAlumno.js';

// Inicializamos componente
const Drawer = createDrawerNavigator();

/**
 * AuthStack Component
 * 
 * Stack de navegación para usuarios autenticados.
 * Utiliza un Drawer navigation con un drawer personalizado
 * 
 * @return {JSX.Element} - Elemento JSX que representa el stack de navegacion
 */

const AuthStack = () => {
  /**
   * Renderiza el Drawer Navigation con opciones de configuración.
   */
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        // Pantalla de Inicio
        name="Inicio"
        component={HomeScreen}
        options={{
          // estilos basicos de la pantalla
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
      // Pantalla de Perfil
        name="Perfil"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            // configuraciones basicas de los estilos de la pantallas
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        // Pantalla de About Us
        name="Acerca de nosotros"
        component={MessagesScreen}
        options={{
          drawerIcon: ({color}) => (
            // Configuraciones basicas de estilos
            <Ionicons name="heart-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// Exportamos todo el contenido
export default AuthStack;