import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native';
import InicioProfesor from '../screens/InicioProfesor.js';
import AcercaDe from '../screens/AcercaDeNosotros.js';

const Drawer = createDrawerNavigator();

// Definir el objeto Colors antes de utilizarlo
const Colors = {
  bg: '#D4BDFA',
  active: '#fff',
  inactive: 'black',
  transparent: 'transparent',
};

// Configuración común para las pantallas en el cajón de navegación
const commonScreenOptions = {
  drawerActiveBackgroundColor: Colors.transparent,
  drawerInactiveBackgroundColor: Colors.transparent,
  drawerActiveTintColor: Colors.active,
  drawerInactiveTintColor: Colors.inactive,
  drawerHideStatusBarOnOpen: Platform.OS === 'ios' ? true : false,
  overlayColor: Colors.transparent,
  drawerStyle: {
    backgroundColor: Colors.bg,
    width: '70%',
  },
};

export function DrawerNavigation() {

  const drawerIcon = ({ focused, size }, name) => {
    return (
      <Icon
        name={name}
        size={size}
        color={focused ? Colors.active : Colors.inactive}
      />
    );
  };
  
  return (
    <Drawer.Navigator
      screenOptions={commonScreenOptions}
    >
      <Drawer.Screen name="Inicio" component={InicioProfesor} 
        options={{
          drawerIcon: options => drawerIcon(options, 'home-outline'),
          gestureEnabled: false, // Deshabilitar el gesto para esta pantalla
        }}
      />
      <Drawer.Screen name="Acerca de nosotros" component={AcercaDe} 
        options={{
          drawerIcon: options => drawerIcon(options, 'heart-outline'),
          gestureEnabled: false, // Deshabilitar el gesto para esta pantalla
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;