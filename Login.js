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
} from 'react-native';
import logo from './assets/LOGO.png';

const Login = () => {
  // Utiliza el hook de navegación y de ruta proporcionados por React Navigation
  const navigation = useNavigation();
  const route = useRoute();

  const [Correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const [registroData, setRegistroData] = useState(null);

  // Efecto secundario para obtener los datos de registro de la ruta
  useEffect(() => {
    // Obtén los datos de registro de la ruta
    const data = route.params ? route.params.registroData : null;
    if (data) {
      setRegistroData(data);
    }
  }, [route.params]);

  // Función para manejar el evento de inicio de sesión
  const handleLogin = () => {
    if (Correo === 'admin' && password === '12345') {
      console.log('Credenciales correctas');
      navigation.push('Home'); // Navegar a la pantalla HomeScreen
    } else {
      Alert.alert('Correo y/o contraseña incorrecta!!');
    }
  };

  // Función para manejar el evento de registro
  const handleRegistro = () => {
    // Navegamos a la pantalla de registro
    navigation.push('Registro');
  };

  // Renderizamos la interfaz para el usuario
  return (
    <ImageBackground
      source={require('./img/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image
          source={logo}
          style={styles.image}
        />
        <Text style={styles.title}>Bienvenido</Text>
        <TextInput
          style={styles.formulario}
          placeholder="228564789"
          value={Codigo}
          onChangeText={setCodigo}
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
    </ImageBackground>
  );
};

// Definición de las caracteristicas y componentes establecidos para los compoentes y su visualización
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  image: {
    height: '40%',
    aspectRatio: 1,
    marginBottom: -20,
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

// Exportamos el componente para su uso en otras partes de la aplicación
export default Login;
