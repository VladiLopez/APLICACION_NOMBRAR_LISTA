import React from "react";
import DrawerNavigation from "./../Navigation/DrawerNavigation.js";

/**
 * Componente de la página de inicio
 * 
 * Esta página representa la pantall de inicio de la aplicación.
 * Muestra la navegación mediante un DrawerNavgeation
 */
const Home = ()=> {
  return(
    <DrawerNavigation />
  )
}

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
export default Home;