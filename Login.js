/**
 * Login.js
 * Importamos los modulos y las librerías necesarias
 */
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { supabase } from "./Lib/supabase";
import logo from './assets/LOGO.png';
import { useClases } from "./src/screens/ClasesContext";
import { useUsuario } from "./src/screens/UsuarioContext";

// Definimos el componente de Login
const Login = () => {
  // Obtenemos la funcion de navegacion desde react navigation
  const navigation = useNavigation();
  // Obtenemos las funciones y estados del componente del contexto de clases y usuarios
  const { getTipoUsuario, setCodigoProfesor } = useClases();

  // Estados locales para el codigo y la contraseña
  const [Codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');

  const { getCodigo } = useUsuario();

  // Funcion para manejar el inicio de sesion
  const handleLogin = async () => {
    try {
      /*
      * Consultamos la base de datos para el usuario con el codigo proporcionado
      */
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('Codigo', Codigo);

      // Manejamos errores en la consulta
      if (error) {
        console.error('Error al consultar la base de datos:', error);
        return;
      }

      // Obtenemos el primer usuario coincidente
      const usuario = data[0];

      // Almacenamos el codigo del usuario en el contexto de usuario
      getCodigo(Codigo);

      // Verificamos credenciales
      if (usuario && usuario.password === password) {
        console.log('Credenciales correctas');

        // Actualizar el tipo de usuario en el contexto
        getTipoUsuario(usuario.Tipo_Usuario);

        // Setear el código del profesor si es profesor
        if (!isNaN(usuario.Codigo)) {
    setCodigoProfesor(parseInt(usuario.Codigo));
  }

        // Continuar con la navegación a la pantalla correspondiente
        navigation.push(usuario.Tipo_Usuario === 'Profesor' ? 'HomeProfesor' : 'HomeAlumno');
      } else {
        // Mostramos una alerta en caso de credenciales incorrectas
        Alert.alert('Código y/o contraseña incorrecta');
      }
    } catch (error) {
      console.error('Error general al interactuar con Supabase:', error);
    }
  };

  // Funcion para manejar la navegacion a la pantalla de registro
  const handleRegistro = () => {
    navigation.push('Registro');
  };

  // Renderizamos el componente visual
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

// Definimos los estilos del componente
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

// Exportamos el componente para su uso en otros archivos
export default Login;
