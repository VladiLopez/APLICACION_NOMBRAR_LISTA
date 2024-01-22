<<<<<<< Updated upstream
import React, { useState, useEffect } from "react";
=======
// Importamos los modulos y librerías necesarias

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
>>>>>>> Stashed changes
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
<<<<<<< Updated upstream
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
=======
  View,
} from 'react-native';
>>>>>>> Stashed changes

const Registro = () => {
  // Utiliza el hook de navegación proporcionado por React Native
  const navigation = useNavigation();

  // Estados para manejar la información del formulario
  const [Nombre, setNombre] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  const [Tipo_Usuario, setTipo_Usuario] = useState('');
  const [registroCompleto, setRegistroCompleto] = useState(false);

  // Función para manejar el evento de registro
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

    // Muestra un mensaje de alerta indicando que los datos han sido registrados.
    Alert.alert('DATOS REGISTRADOS!!');
    // Aquí puedes realizar la autenticación o guardar los datos en un servicio

    // Navega a la pantalla de inicio de sesión y pasa los datos de registro como parametro.
    navigation.push('Login', { registroData });
  };

  // Función para manejar el evento de inicio de sesión
  const handleLogin = () => {
    // Navegamos a la pantalla de inicio de sesión
    navigation.push('Login');
  };

<<<<<<< Updated upstream
  const handleTipoUsuarioChange = (value) => {
    setTipo_Usuario(value);
  };

  const verificarRegistroCompleto = () => {
    if (Nombre && Apellidos && Correo && Codigo && password && Tipo_Usuario) {
      setRegistroCompleto(true);
    } else {
      setRegistroCompleto(false);
    }
  };

  useEffect(() => {
    verificarRegistroCompleto();
  }, [Nombre, Apellidos, Correo, Codigo, password, Tipo_Usuario]);

=======
  // Renderizamos la interfaz para el usuario
>>>>>>> Stashed changes
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
        <Button title="Registrar" onPress={handleRegistro} color='#3D2788' disabled={!registroCompleto} />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text>{'\n'}</Text>
          <Text style={styles.boton_registro}>¿Tienes cuenta? Inicia sesión aquí.</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Configuración de los estilos del componente asociado
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
    color: 'white',
    fontWeight: 'bold'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

const pickerSelectStyles = StyleSheet.create({
  estilo: {
    marginLeft: -15,
    marginVertical: -9,
    fontSize: 12,
  },
});

// Exportamos el componente para su uso en otras partes de la aplicación
export default Registro;
