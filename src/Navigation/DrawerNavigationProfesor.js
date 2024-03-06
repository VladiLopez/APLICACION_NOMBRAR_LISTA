// Importamos las librerias y los componentes necesarios

import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react'; // Importamos react native
import CustomDrawer from '../Navigation/CustomDrawer.js';

import Ionicons from 'react-native-vector-icons/Ionicons';
// realizamos la importación de las pantallas para la navegación
import MessagesScreen from '../screens/AcercaDeNosotros.js';
import HomeScreen from '../screens/InicioProfesor.js';
import ListadoAsistencia from '../screens/ListadoAsistencia.js';
import ProfileScreen from '../screens/PerfilProfesor.js';

/**
 * Drawer Navigation Instance
 * 
 * Instancia del Drawer navigator creada mediante la funcion createDrawerNavigator.
 * Se utiliza para gestionar la navegación tipo drawer en la aplicación.
 */
const Drawer = createDrawerNavigator();

/**
 * AuthStack Component
 * 
 * Stack de navegacion para usuarios autenticados.
 * Utiliza un Drawer Navigator con un drawer personalizado.
 * 
 * @returns {JSX.Element} - Elemento JSX que representa el stack de navegación
 */
const AuthStack = () => {
  /**
   * Renderiza el Drawer Navigation con opciones de configuracion.
   */
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        // Establecemos la configuración de los estilos que tendrán las pantallas
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
        // Pantalla Incio
        name="Inicio"
        component={HomeScreen}
        options={{
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
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
      // Pantalla de Lista de asistencia
        name="Listas de asistencia"
        component={ListadoAsistencia}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="document-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
      // Pantalla About Us
        name="Acerca de nosotros"
        component={MessagesScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="heart-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// Exportamos todo el contenido
export default AuthStack;