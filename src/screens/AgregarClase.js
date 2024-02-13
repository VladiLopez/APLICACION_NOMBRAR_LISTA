// Importamos librerías y componentes necesarios
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import { handleAltaRelacion } from "../backend/altaClase";
import { useClases } from "./ClasesContext";

// Componente funcional "AgregarClase".
const AgregarClase = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { codigoProfesor } = useClases();
  const codigo = codigoProfesor;

  const [NRC, setNRC] = useState('');
  const isCodigoValid = NRC.length === 6;

  const handleUnirse = () => {
    if (isCodigoValid) {
      handleAltaRelacion(codigo, NRC);
      navigation.navigate('Inicio');
    } else {
      Alert.alert('Código inválido');
    }
  };

  return (
    <ImageBackground
      source={require('../../img/background_crearLista.jpg')}
      style={styles.container}
    >
      <Text style={styles.title}>Agregar una clase</Text>
      <TextInput
        style={styles.formulario}
        placeholder="J5OP46"
        value={NRC}
        onChangeText={setNRC}
        maxLength={6}
      />
      <TouchableOpacity
          style={[styles.customButton, !!isCodigoValid && styles.buttonDisabled]}
          onPress={handleUnirse}
          disabled={!isCodigoValid}
        >
          <Text style={styles.customButtonText}>Unirse</Text>
      </TouchableOpacity>
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
    backgroundColor: '#D3D3D3', // Color gris
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
    backgroundColor: '#3D2788',
  }
});

export default AgregarClase;
