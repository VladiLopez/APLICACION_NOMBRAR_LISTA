import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import logo from './assets/LOGO.png';

/**
 * Componente funcional que representa la pantalla de inicio de sesion. 
 * Permite a los usuarios ingresar su correo electronico y contraseña para acceder a la aplicion.
 */
const Login = () => {
  const navigation = useNavigation(); // Hook de React Navigation para acceder a la navegacion
  const route = useRoute();// Hook de React Navigation para acceder a la ruta actual

  // Estado local para el correo electronico y la contraseña
  const [Correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  // Estado local para almacenar los datos de registro pasados por la ruta de navegacion
  const [registroData, setRegistroData] = useState(null);

  // Efecto que se ejecuta cuando cambia la ruta para obtener los datos de registro de la ruta
  useEffect(() => {
    // Obtén los datos de registro de la ruta
    const data = route.params ? route.params.registroData : null;
    if (data) {
      setRegistroData(data);
    }
  }, [route.params]);

  //Funcion para manejar el evento de inicio de sesion
  const handleLogin = () => {
    if (Correo === 'admin' && password === '12345') {
      console.log('Credenciales correctas');
      navigation.push('Home'); // Navegar a la pantalla HomeScreen
    } else {
      Alert.alert('Correo y/o contraseña incorrecta!!');//Mostrar una alerta si las credenciales son incorrectas
    }
  };

  // Renderizado de la interfaz de usuario
  const handleRegistro = () => {
    navigation.push('Registro');
  };

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.image}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.formulario}
        placeholder="tuCorreo@ejemplo.com"
        value={Correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={styles.formulario}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} color='#3D2788' />
      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text>{'\n'}</Text>
        <Text style={styles.boton_registro}>¿No tienes cuenta? Regístrate aquí.</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos para la interfaz de usuario
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D4BDFA',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  image: {
    height: '30%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  formulario: {
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 70,
    backgroundColor: 'white',
  },
  boton_registro: {
    fontSize: 17,
    color: '#3D2788',
    fontWeight: 'bold'
  },
});

// Exportamos el componente para que pueda ser usado en otras partes de la app.
export default Login;