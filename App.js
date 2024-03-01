import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import 'react-native-gesture-handler';
import Login from './Login.js'; // Importar el componente de inicio de sesion
import Registro from './Registro.js'; // importa el componente de registro
import { ClasesProvider } from "./src/screens/ClasesContext"; // Importa el proveedor de contexto para las clases 
import CrearClase from './src/screens/CrearClase.js'; // Importa el componente para crear una clase
import Home from './src/screens/Home.js'; // importa el componente de inicio
import { default as Clase, default as Listado } from './src/screens/Listado.js'; // Importa el componente de detalle de clase
import ScannQR from './src/screens/ScannQR.js'; // Importa el componente para escanear codigos QR

// Crea un stack navigatior para gestionar la navegacion
const Stack = createStackNavigator();

/**
 * Componente principal de la aplicacion que establece la estructura de navegacion.
 * Utiliza React Navigation para gestionar la navegacion entre pantallas.
 */
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

// Exporta el componente principal de la aplicacion
export default App;