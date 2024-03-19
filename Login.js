/**
 * Importación de componentes y librerías necesarias desde React Native
 */
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
import logo from './assets/LOGO.png';// Importacion de la imagen del logo de la aplicación
import { useNavigation } from "@react-navigation/native";// Importación del hook useNavigation para la navegación entre pantallas
import { supabase } from "./Lib/supabase";//Importación de la instancia de Supabase para la autenticación
import { useClases } from "./src/screens/ClasesContext";// Importación del contexto de clases para almacenar el código de usuario

// Definición del componente funcional Login
const Login = () => {
  // Inicialización del hook de navegación
  const navigation = useNavigation();
  // uso del contexto de clases para almacenar el código de usuario
  const { setCodigoUsuario } = useClases();
  // Estados locales para almacenar el código y la contraseña del usuario
  const [Codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  // Estados locales para controlar la visualización de alertas
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    try {
      // Consulta la base de datos para obtener los datos del usuario
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('Codigo', Codigo);

      // Manejo de errores en la consulta
      if (error) {
        return;
      }
      // Almacenamiento de los datos del usuario
      const usuario = data[0];

      // Verificación de la validez de las credenciales del usuario
      if (usuario && usuario.password === password) {

        // Si el usuario es un profesor, se establece su código en el contexto de clases
        if (!isNaN(Codigo)) {
          setCodigoUsuario(parseInt(Codigo));
        }

        // Navegación a la pantalla de inicio correspondiente al tipo de usuario
        navigation.push(usuario.Tipo_Usuario === 'Profesor' ? 'HomeProfesor' : 'HomeAlumno');
      } else {
        // Visualización de mensaje de alerta en caso de credenciales incorrectas
        setAlertMessage('Correo y/o contraseña incorrecta!!');
        setShowAlert(true);
      }
    } catch (error) {
      // Manejo de errores en la autenticación
    }
  };

  // Función para manejar la navegación a la pantalla de registro
  const handleRegistro = () => {
    navigation.push('Registro');
  };
  // Retorno del componente de inicio de sesión
  return (
    // Definición del componente de inicio de sesión con fondo de imagen
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

// Definición de estilos para los componentes de la pantalla de inicio de sesión
const styles = StyleSheet.create({
  // Estilo para el contenedor principal
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  // Estilo para el título de la pantalla
  title: {
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  // Estilo para la imagen del logo de la aplicación
  image: {
    height: '40%',
    aspectRatio: 1,
    marginBottom: -20,
  },
  // Estilo para los campos de entrada del formulario
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
  // Estilo para el boton personalizado de inicio de sesión
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
  // Estilo para el texto del botón personalizado de inicio de sesión
  customButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilo para el texto del botón de registro
  boton_registro: {
    fontSize: 17,
    color: '#3D2788',
    fontWeight: 'bold'
  },
  // Estilo para el fondo de la imagen de fondo
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  // Estilo para el fondo de la imagen de fondo
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Estilo para el contenedor del modal de alerta
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  // Estilo para el texto del modal de alerta
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  // Estilo para el texto del modal de alerta
  modalButton: {
    backgroundColor: '#3D2788',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  // Estilo para el texto del botón del modal de alerta
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

// Exportación del objeto de estilos
export default Login;