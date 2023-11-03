import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './Login.js';
import Registro from './Registro.js';
import HomeProfesor from './src/screens/HomeProfesor.js'; //HOME.JS HACE LA CONEXIÓN DEL MENÚ DESPLEGABLE
import HomeAlumno from './src/screens/HomeAlumno.js';
import CrearClase from './src/screens/CrearClase.js'; 
import AgregarClase from './src/screens/AgregarClase.js'; 
import Listado from './src/screens/Listado.js'; 
import ScannQR from './src/screens/ScannQR.js'; 
import { ClasesProvider } from "./src/screens/ClasesContext";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ClasesProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeProfesor" component={HomeProfesor} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeAlumno" component={HomeAlumno} options={{ headerShown: false }}/>
          <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }}/>
          <Stack.Screen name="CrearClase" component={CrearClase} options={{ headerShown: false}}/>
          <Stack.Screen name="Listado" component={Listado} options={{ headerShown: false}}/>
          <Stack.Screen name="AgregarClase" component={AgregarClase} options={{ headerShown: false}}/> 
          <Stack.Screen name="ScannQR" component={ScannQR} options={{ headerShown: false}}/> 
        </Stack.Navigator>
      </ClasesProvider>
    </NavigationContainer>
  );
};

export default App;