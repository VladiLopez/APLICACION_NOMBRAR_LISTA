// Login.js
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import logo from './assets/LOGO.png';
import { useNavigation } from "@react-navigation/native";
import { supabase } from "./Lib/supabase";
import { useClases } from "./src/screens/ClasesContext";

const Login = () => {
  const navigation = useNavigation();
  const { setCodigoUsuario } = useClases();

  const [Codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('Codigo', Codigo);

      if (error) {
        console.error('Error al consultar la base de datos:', error);
        return;
      }

      const usuario = data[0];

      if (usuario && usuario.password === password) {
        console.log('Credenciales correctas');

        // Setear el código del profesor si es profesor

        if (!isNaN(Codigo)) {
          setCodigoUsuario(parseInt(Codigo));
        }

        // Continuar con la navegación
        navigation.push(usuario.Tipo_Usuario === 'Profesor' ? 'HomeProfesor' : 'HomeAlumno');
      } else {
        Alert.alert('Código y/o contraseña incorrecta');
      }
    } catch (error) {
      console.error('Error general al interactuar con Supabase:', error);
    }
  };

  const handleRegistro = () => {
    navigation.push('Registro');
  };

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
          keyboardType="numeric"
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

export default Login;

