/**
 *            Querido programador
 * 
 * En el momento en el que estamos programando esto solo 
 * nosotros y diosito saben cómo lo hicimos, ahora solo 
 * diosito lo sabe.
 * 
 * Espero puedas programarla y mejorarla
 * 
 * Si no puedes incrementa el contador de horas:[ 1 hrs ]
 */

// Importamos los modulos y las liberías necesarias
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'; // Importamos React native para el desarrollo de la app para dispositivos moviles
import 'react-native-gesture-handler';

// Importamos las pantallas
import Login from './Login.js';
import Registro from './Registro.js';
import AgregarClase from './src/screens/AgregarClase.js';
import Alumnos from './src/screens/Alumnos.js';
import { ClasesProvider } from "./src/screens/ClasesContext";
import CrearClase from './src/screens/CrearClase.js';
import EditarPerfil from './src/screens/EditarPerfil.js';
import HomeAlumno from './src/screens/HomeAlumno.js';
import HomeProfesor from './src/screens/HomeProfesor.js'; //HOME.JS HACE LA CONEXIÓN DEL MENÚ DESPLEGABLE
import Listado from './src/screens/Listado.js';
import ModificarClase from './src/screens/ModificarClase.js';
import ScannQR from './src/screens/ScannQR.js';
import { UsuarioProvider } from "./src/screens/UsuarioContext";

// Creamos el Stack Navigator de React Navigation.
const Stack = createStackNavigator();

// Definimos el componente principal de la aplicacion.
const App = () => {
  return (
    <NavigationContainer>
      <ClasesProvider>
      <UsuarioProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeProfesor" component={HomeProfesor} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeAlumno" component={HomeAlumno} options={{ headerShown: false }}/>
          <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }}/>
          <Stack.Screen name="CrearClase" component={CrearClase} options={{ headerShown: false}}/>
          <Stack.Screen name="Listado" component={Listado} options={{ headerShown: false}}/>
          <Stack.Screen name="AgregarClase" component={AgregarClase} options={{ headerShown: false}}/> 
          <Stack.Screen name="ScannQR" component={ScannQR} options={{ headerShown: false}}/> 
          <Stack.Screen name="ModificarClase" component={ModificarClase} options={{ headerShown: false}}/>
          <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ headerShown: false}}/> 
          <Stack.Screen name="Alumnos" component={Alumnos} options={{ headerShown: true}}/> 
        </Stack.Navigator>
        </UsuarioProvider>
      </ClasesProvider>
    </NavigationContainer>
  );
};

// Exportamos el componente principal para ser utilizado en otros archivos
export default App;