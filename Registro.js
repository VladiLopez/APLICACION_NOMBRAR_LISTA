import { Picker } from '@react-native-picker/picker'; // Importacion del componente Picker
import { useNavigation } from "@react-navigation/native"; // Importación del hook de navegacion
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'; // Importación de componentes de React Native

import { handleAltaUsuario } from "./src/backend/altaUsuario"; // Importacion de la funcion handleAltaUsuario desde el backend

const Registro = () => { // Declaracion del componente funcional Registro
  const navigation = useNavigation(); // Obtener el objeto de navegacion

  // Declaracion de estados para los campos del formulario y la verificacion del registro completo
  const [Nombre, setNombre] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  const [Tipo_Usuario, setTipo_Usuario] = useState('');
  const [registroCompleto, setRegistroCompleto] = useState(false);

  // Efecto para verificar si el registro esta completo
  useEffect(() => {
    verificarRegistroCompleto();
  }, [Nombre, Apellidos, Correo, Codigo, password, Tipo_Usuario]);

  // Funcion para manejar el registro de usuario
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

    handleAltaUsuario(registroData);// LLamar a la funcion para registrar el usuario en el backend

    navigation.push('Login', { registroData }); // Navegar a la pantalla de inicio de sesion y pasar los datos de registro como parametros
  };

  // Funcion para manejar la navegacion a la pantalla de inicio de sesion
  const handleLogin = () => {
    navigation.push('Login');
  };

  // Funcion para manejar el cambio de tipo de usuario
  const handleTipoUsuarioChange = (value) => {
    setTipo_Usuario(value);
  };

  // Funcion para verificar si el registro esta completo
  const verificarRegistroCompleto = () => {
    if (Nombre && Apellidos && Correo && Codigo && password && Tipo_Usuario) {
      setRegistroCompleto(true);
    } else {
      setRegistroCompleto(false);
    }
  };

  // Retorno del JSX que representa la interfaz del componente
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

// Estilos del componente
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
  buttonDisabled: {
    backgroundColor: '#D3D3D3', // Color gris
  }
});

// Estilos especificos para el componente Picker
const pickerSelectStyles = StyleSheet.create({
  estilo: {
    marginLeft: -15,
    marginVertical: -9,
    fontSize: 12,
  },
});

// Exportar el componente Registro
export default Registro;