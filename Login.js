// Login.js
import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Modal,
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

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


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
        setAlertMessage('Correo y/o contraseña incorrecta!!');
        setShowAlert(true);
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
        <TouchableOpacity style={styles.customButton} onPress={handleLogin}>
          <Text style={styles.customButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegistro}>
          <Text>{'\n'}</Text>
          <Text style={styles.boton_registro}>¿No tienes cuenta? Regístrate aquí.</Text>
        </TouchableOpacity>
        <Modal
          visible={showAlert}
          transparent={true}
          animationType='fade'
          onRequestClose={() => setShowAlert(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>{alertMessage}</Text>
              <TouchableOpacity onPress={() => setShowAlert(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  customButton: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D2788',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 5,
  },
  customButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#3D2788',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Login;