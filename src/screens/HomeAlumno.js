/**
 * Importamos el modulo de React-native y el DrawerComponent para poder desplegar los elementos visuales
 */

import React from "react";
import DrawerNavigation from "./../Navigation/DrawerNavigationaAlumno.js";

/**
 * Componente HomeAlumno.
 * 
 * @description Este componente representa la pantalla para un usuario tipo Alumno.
 * Renderiza el componente de navegación de tipo cajón (drawerNavigation) que proporciona
 * acceso a diferentes secciones de la aplicación.
 * 
 * @returns {JSX.Element} Elemento JSX que renderiza la pantalla principal del Alumno.
 */
const HomeAlumno = ()=> {
  return(
    <DrawerNavigation/>
  )
}

// Exportar el componente para su uso en otras partes de la aplicación
export default HomeAlumno;