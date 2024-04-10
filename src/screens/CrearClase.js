import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import { 
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

/**
 * Componente funcional CrearClase.
 * 
 * @description Este componente representa la pantalla para que el usuario cree una nueva clase.
 * Permite al usuario ingresar informacioón como el nombre de la clase, sección, aula y NRC.
 * La información se guarda a través del contexto de Clases para su gestión global.
 * 
 * @returns {JSX.Element} Elemento JSX que renderiza la pantalla de la creación de clases.
*/
const CrearClase = () => {
  // función de navegación proporcionada por React Navigation
  const navigation = useNavigation();
  
  // Funciones y estado del contexto de Clases
  const { agregarClase, codigoProfesor } = useClases();  // Cambié setClases por agregarClase

  // Estados locales para almacenar la información de la nueva    
  const [NombreClase, setNombreClase] = useState('');
  const [Seccion, setSeccion] = useState('');
  const [Aula, setAula] = useState('');
  const [NRC, setNRC] = useState('');
  const [Hora_inicio, setHora_inicio] = useState('');
  const [Hora_fin, setHora_fin] = useState('');
  const [registroCompleto, setRegistroCompleto] = useState(false);

  const codigo = codigoProfesor;

  //Función para manejar el boton de "Cancelar"
  const handlePress = () => {
    navigation.navigate('Inicio');
  };

  // Función para verificar la existencia de una clase con el mismo NRC
  const verificarExistenciaClase = async (nrc) => {
    try {
      const { data, error } = await supabase
        .from('clases')
        .select('NRC')
        .eq('NRC', nrc);

      if (error) {
        console.error('Error al verificar la existencia de la clase:', error);
        return false; // En caso de error, asumimos que la clase no existe
      }

      return data.length > 0; // Devuelve true si hay clases con el mismo NRC, false de lo contrario
    } catch (error) {
      console.error('Error al verificar la existencia de la clase:', error);
      return false; // En caso de error, asumimos que la clase no existe
    }
  };
    
  // Función para registrar una nueva clase
  const handleRegistroMateria = async () => {
    const nuevaClase = {NRC, NombreClase, Seccion, Aula, Hora_inicio, Hora_fin};
  
    // Verificar si ya existe una clase con el mismo NRC
    const claseExistente = await verificarExistenciaClase(NRC);
  
    if (claseExistente) {
      // Muestra el mensaje de alerta si la clase ya existe
      Alert.alert('Error', 'Ya existe una clase con este NRC');
    } else {
      // Registra la nueva clase si no existe
      await handleAltaClase(nuevaClase);
      await handleAltaRelacion(codigo, NRC);
      agregarClase(nuevaClase);
      navigation.navigate('Inicio', {NRC, NombreClase, Seccion, Aula, Hora_inicio, Hora_fin});
      // No navegamos a ninguna parte al presionar "OK"
    }
  };

  // Función para verificar si todos los campos estan completos
  const verificarRegistroCompleto = () => {
    if (NombreClase && Seccion && Aula && NRC && Hora_inicio && Hora_fin) {
      setRegistroCompleto(true);
    } else {
      setRegistroCompleto(false);
    }
  };

  // Efecto secundario para verificar el registro completo cuando cambian los valores.
  useEffect(() => {
    verificarRegistroCompleto();
  }, [NombreClase, Seccion, Aula, NRC, Hora_inicio, Hora_fin]);

    // Renderizamos el componente
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
            <TextInput
            style={styles.formulario}
            placeholder="Inicio de clase (HH:MM)"
            value={Hora_inicio}
            onChangeText={setHora_inicio}
            />
            <TextInput
            style={styles.formulario}
            placeholder="Fin de la clase (HH:MM)"
            value={Hora_fin}
            onChangeText={setHora_fin}
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

// Estilos asociados al componente
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

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
export default CrearClase;
