/**
 * Importamos los modulos y las librerías necesarias para poder crear los elementos visuales y poder interactuar con los componentes en pantalla.
 * 
 * Además de que mandamos llamar las otras pantallas con todas las funciones backend
 */
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';

import {handleAltaUsuario} from "./src/backend/altaUsuario";

/**
 * Funcion backend - Registro
 * Extraemos los elementos del 
 * formulario de registro y los asignamos 
 * a espacios de memoria para ser almacenados
 */
const Registro = () => {
  const navigation = useNavigation();

  const [Nombre, setNombre] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  const [Tipo_Usuario, setTipo_Usuario] = useState('');
  const [registroCompleto, setRegistroCompleto] = useState(false);

  /**
   * creamos una funcion para verificar que los campos del formulario a llenar esten rellenados
   */
  useEffect(() => {
    verificarRegistroCompleto();
  }, [Nombre, Apellidos, Correo, Codigo, password, Tipo_Usuario]);

  const handleRegistro = () => {
    // Guarda los datos del registro en una variable local o en un servicio de autenticación
    const registroData = {
      Nombre,
      Apellidos,
      Correo,
      Codigo,
      password,
      Tipo_Usuario,
    };

    /**
     * Funcion registro - Caso exitoso
     * El usuario fue capaz de rellenar todos
     * los campos solicitados, se consulta el boton de registro
     * boton que nos redirigirá a la ventana de login.
     * Esto con el fin de realizar una doble validación y 
     * evitar tecnicas como bypass
     */
    handleAltaUsuario(registroData);

    navigation.push('Login', { registroData }); // Pasa los datos de registro como parámetro
  };

  /**
   * En un caso exitoso, nos redirigirá a la ventana de login
   */
  const handleLogin = () => {
    navigation.push('Login');
  };

  /**
   * Función backend la cual nos permite en algun determinado
   * momento cambiar nuestro tipo de usuario. Función
   * pensada en el caso de que al momento de realizar el
   * registro el usuario se equivocó de tipo de usuario o 
   * si el alumno sube de categoría a profesor 
   */
  const handleTipoUsuarioChange = (value) => {
    setTipo_Usuario(value);
  };

  /**
   * Implementacion de una función simple la cual nos permite
   * realizar las tareas de validacion al momento de 
   * interactuar con el usuario, asegurandonos que el 
   * usuario rellenó todos los campos solicitados con exito
   */
  const verificarRegistroCompleto = () => {
    if (Nombre && Apellidos && Correo && Codigo && password && Tipo_Usuario) {
      setRegistroCompleto(true);
    } else {
      setRegistroCompleto(false);
    }
  };

  /**
   * Renderizamos el componente
   */
  return (
    <ImageBackground
      source={require('./img/backgroundReg.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <TextInput
          style={styles.formulario}
          placeholder="Nombre"
          value={Nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.formulario}
          placeholder="Apellidos"
          value={Apellidos}
          onChangeText={setApellidos}
        />
        <TextInput
          style={styles.formulario}
          placeholder="Código"
          value={Codigo}
          onChangeText={setCodigo}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.formulario}
          placeholder="tuCorreo@ejemplo.com"
          value={Correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.formulario}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.formulario}>
          <Picker
            selectedValue={Tipo_Usuario}
            onValueChange={handleTipoUsuarioChange}
            mode="dropdown"
            style={pickerSelectStyles.estilo}
          >
            <Picker.Item label="Seleccionar tipo de usuario" value={null} />
            <Picker.Item label="Profesor" value={'Profesor'} onChangeText={setTipo_Usuario} />
            <Picker.Item label="Alumno" value={'Alumno'} onChangeText={setTipo_Usuario} />
          </Picker>
        </View>
        <TouchableOpacity
          style={[styles.customButton, !registroCompleto && styles.buttonDisabled]}
          onPress={handleRegistro}
          disabled={!registroCompleto}
        >
          <Text style={styles.customButtonText}>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text>{'\n'}</Text>
          <Text style={styles.boton_registro}>¿Tienes cuenta? Inicia sesión aquí.</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

/**
 * Definimos los estilos para los componentes visuales que apreciamos en la pantalla
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  /**
   * Estilos para el titulo, también lo podemos usar para encabezados
   */
  title: {
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  /**
   * Estilos visuales para el formulario con el cual interactuaremos con el usuario
   */
  formulario: {
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 70,
    backgroundColor: 'white'
  },
  /**
   * Boton simple
   */
  boton_registro: {
    fontSize: 17,
    color: '#3D2788',
    fontWeight: 'bold'
  },
  /**
   * Debido a falta de habilidades con CSS para replicar la maqueta
   * se decidió implementar el imagen completa para el fondo
   * y así evitar batallar con el CSS.
   * Se sacrifica un poco de procesamiento y recurso al renderizar
   */
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  /**
   * Estilos del boton
   */
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
  /**
   * Texto el cual es hypervinculo
   */
  customButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  /**
   * Estilos de un boton deshabilitado
   */
  buttonDisabled: {
    backgroundColor: '#D3D3D3', // Color gris
  }
});

/**
 * Definir la forma en la que se apreciará los elementos seleccionados
 */
const pickerSelectStyles = StyleSheet.create({
  estilo: {
    marginLeft: -15,
    marginVertical: -9,
    fontSize: 12,
  },
});

/**
 * Exportamos el componente para poder usarlo en otra parte de la aplicación
 */
export default Registro;