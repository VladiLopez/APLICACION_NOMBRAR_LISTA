import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import { 
  Button, 
  Image, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Alert,
  Dimensions,
  ImageBackground 
} from 'react-native';

import { useClases } from "./ClasesContext";

import {supabase} from "../../Lib/supabase";

import{handleAltaClase} from "../backend/altaClase";
import{handleAltaRelacion} from "../backend/altaClase";

const CrearClase = () => {
    const navigation = useNavigation();
    const { agregarClase, codigoProfesor } = useClases();

    const [NombreClase, setNombreClase] = useState('');
    const [Seccion, setSeccion] = useState('');
    const [Aula, setAula] = useState('');
    const [NRC, setNRC] = useState('');
    const [registroCompleto, setRegistroCompleto] = useState(false);

    const codigo = codigoProfesor;
    
    const handleRegistroMateria = async () => {
      const nuevaClase = {NRC, NombreClase, Seccion, Aula};
      await handleAltaClase(nuevaClase);
      await handleAltaRelacion(codigo,NRC);
      agregarClase(nuevaClase);
      console.log('\nNombre de la Clase: ${NombreClase}"\nSeccion: ${Seccion}\nAula: ${Aula}\nNRC: ${NRC}\n');
      navigation.navigate('Inicio', {NRC, NombreClase, Seccion, Aula});
    };
    
    const verificarRegistroCompleto = () => {
      if (NombreClase && Seccion && Aula && NRC) {
        setRegistroCompleto(true);
      } else {
        setRegistroCompleto(false);
      }
    };

    useEffect(() => {
      verificarRegistroCompleto();
    }, [NombreClase, Seccion, Aula, NRC]);

    return (
      <ImageBackground
        source={require('../../img/background_crearLista.jpg')}
        style={styles.backgroundImage}
        >
        <View style={styles.container}>
          <View style={styles.clase}>
            <Text style={styles.title}>Crear clase</Text>
            <TextInput
              style={styles.formulario}
              placeholder="Nombre de la clase"
              value={NombreClase}
              onChangeText={setNombreClase}
            />
            <TextInput
              style={styles.formulario}
              placeholder="Seccion"
              value={Seccion}
              onChangeText={setSeccion}
            />
            <TextInput
              style={styles.formulario}
              placeholder="Aula"
              value={Aula}
              onChangeText={setAula}
            />
            <TextInput
              style={styles.formulario}
              placeholder="NRC"
              value={NRC}
              keyboardType="numeric"
              onChangeText={setNRC}
            />
            <TouchableOpacity 
              style={[styles.customButton, !registroCompleto && styles.disabledButton]} 
              onPress={handleRegistroMateria} 
              disabled={!registroCompleto}
            >
              <Text style={styles.customButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
    fontWeight: 'bold',
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
  clase: {
    width: '90%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '30%',
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

export default CrearClase;
