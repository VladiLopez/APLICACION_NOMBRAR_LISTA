import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import logo from './assets/LOGO.png'
import { useNavigation, useRoute } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [Codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');

  const [registroData, setRegistroData] = useState(null);

  useEffect(() => {
    // Obtén los datos de registro de la ruta
    const data = route.params ? route.params.registroData : null;
    if (data) {
      setRegistroData(data);
    }
  }, [route.params]);

  /*const handleLogin = () => {
    if (registroData) {
      if (Codigo === registroData.Codigo && password === registroData.password) {
        console.log('Credenciales correctas');
        if (registroData.Tipo_Usuario === 'Profesor') {
          navigation.push('HomeProfesor'); // Pantalla para el profesor
        } else if (registroData.Tipo_Usuario === 'Alumno') {
          navigation.push('HomeAlumno'); // Pantalla para el alumno
        }
      } else {
        Alert.alert('Correo y/o contraseña incorrecta!!');
      }
    } else {
      Alert.alert('No se encontraron datos de registro. Regístrate primero.');
    }
  };*/

  const handleLogin = () => {
    if (Codigo === '1' && password === '1') {
      console.log('Credenciales correctas');
      navigation.push('HomeProfesor'); // Navegar a la pantalla HomeScreen
    }
    else if (Codigo === '2' && password === '2') {
      console.log('Credenciales correctas');
      navigation.push('HomeAlumno'); // Navegar a la pantalla HomeScreen
    }
    else {
      Alert.alert('Correo y/o contraseña incorrecta!!');
    }
  };


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
  );
};

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
});

export default Login;