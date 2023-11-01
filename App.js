import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Login from './Login.js';
import Registro from './Registro.js';
import Home from './src/screens/Home.js'; //HOME.JS HACE LA CONEXIÓN DEL MENÚ DESPLEGABLE
import CrearClase from './src/screens/CrearClase.js'; 
import Clase from './src/screens/Listado.js'; 
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
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
          <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }}/>
          <Stack.Screen name="CrearClase" component={CrearClase} options={{ headerShown: false}}/>
          <Stack.Screen name="Listado" component={Listado} options={{ headerShown: false}}/>
          <Stack.Screen name="Clase" component={Clase} options={{ headerShown: false}}/> 
          <Stack.Screen name="ScannQR" component={ScannQR} options={{ headerShown: false}}/> 
        </Stack.Navigator>
      </ClasesProvider>
    </NavigationContainer>
  );
};

export default App;