// Importamos librerías y componentes necesarios
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import{handleAltaRelacion} from "../backend/altaClase";


import { useClases } from "./ClasesContext";

/**
 * Componente funcional "AgregarClase".
 * 
 * @description Este componente representa la pantalla para que un alumno pueda agregar una clase.
 * Los alumnos ingresan un código de clase y, si es válido, son redigidos a la pantalla HomeAlumno.
 * 
 * @returns {JSX.Element} Elemento JSX que renderiza la pantalla de agregar clase.
 * 
 */
const AgregarClase = () => {
  // Obtener funciones de navegación de React Native
  const navigation = useNavigation();
  const route = useRoute();

  const {codigoProfesor} = useClases();

  const codigo = codigoProfesor;

  // Estado local para el código ingresaso por el usuario
  const [NRC, setNRC] = useState('');
  // Validar si el código ingresado tiene una longitud de 6 caracteres
  const isCodigoValid = NRC;

  /**
   * Manejador de evento para unirse a la clase
   * Redirigiendo a la pantalla HomeAlumno si el código es válido,
   * muestra una alerta en caso contrario
   */
  const handleUnirse = () => {
    if (isCodigoValid) {
      handleAltaRelacion(codigo,NRC); 
      navigation.navigate('Inicio');// Pantalla para el alumno
    } else {
      // Puedes mostrar una alerta o realizar alguna acción si el código no es válido
      Alert.alert('Código inválido');
    }
  };

  // Renderiza la interfaz de usuario
  return (
    <ImageBackground
        source={require('../../img/background_crearLista.jpg')}
        style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Agregar una clase</Text>
        <TextInput
          style={styles.formulario}
          placeholder="J5OP46"
          value={NRC}
          onChangeText={setNRC}
          maxLength={6} // Limita la longitud máxima a 6 dígitos
        />
        <TouchableOpacity 
            style={[styles.customButton, !isCodigoValid && styles.disabledButton]} 
            onPress={handleUnirse} 
            disabled={!isCodigoValid}
          >
          <Text style={styles.customButtonText}>Unirse</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Estilos asociados al componente
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
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
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
  disabledButton: {
    backgroundColor: 'gray', // Cambia el color del botón cuando está desactivado
  },
});

// Exportamos el componente para su uso en otras partes de la aplicación
export default AgregarClase;
