import React from "react";
import DrawerNavigation from "./../Navigation/DrawerNavigationProfesor.js";

/**
 * Componete HomeProfesor.
 * 
 * @description Este componente representa la pantalla principal para un usuario tipo Profesor.
 * Renderiza el componente de navegación tipo cajón (DrawerNavigation) especifico para profesores.
 * proporciona acceso a diferentes secciones de la aplicación.
 * 
 * @returns {JSX.Element} Elemento JSX que renderiza la pantalla del profesor
 */
const HomeProfesor = ()=> {
  return(
    <DrawerNavigation/>
  )
}

// Exportamos el componente para su uso en otras partes de la aplicación
export default HomeProfesor;