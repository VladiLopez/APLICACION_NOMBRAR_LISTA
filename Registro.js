/**
 * Importamos los componentes y hooks necesarios para la navegación y el manejo de los estados
 */
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Registro = () => {
  // Componente funcional para la pantalla de registro
  const navigation = useNavigation();
  // Obtener el objeto de navegacion para navegar entre pantallas

  const [Nombre, setNombre] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  /**
   * Declaramos estado de variables para guardar las 
   * entradas del usuarios para detalles de registro
   */

  const handleRegistro = () => {
    // Guarda los datos del registro en una variable local o en un servicio de autenticación
    const registroData = {
      Nombre,
      Apellidos,
      Correo,
      Codigo,
      password,
    };
    // Creamos los datos del objeto desde la entrada del usuario

    Alert.alert('DATOS REGISTRADOS!!');
    // Aquí puedes realizar la autenticación o guardar los datos en un servicio

    navigation.push('Login', { registroData }); // Pasa los datos de registro como parámetro
  };

  const handleLogin = () => {
      // Function to handle login button press
    navigation.push('Login');
    // Navegar a la pantalla del login
  };

  // renderizamos el componente
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      />
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
      <Button title="Registrarse" onPress={handleRegistro} color='#3D2788' />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text>{'\n'}</Text>
        <Text style={styles.boton_registro}>¿Tienes cuenta? Inicia sesión aquí.</Text>
      </TouchableOpacity>
    </View>
  );
};

// Definimos los estilos para la pantalla
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
});

// Exportamos el componente para que pueda ser usado en otra parte de la app
export default Registro;
