// Importamos librerias y modulos necesarios

import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {SupabaseClient} from '@supabase/supabase-js';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useClases } from "./ClasesContext";

import {supabase} from "../../Lib/supabase";

import{handleAltaClase} from "../backend/altaClase";
import{handleAltaRelacion} from "../backend/altaClase";


/**
 * Componente funcional CrerClase.
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
    const { agregarClase } = useClases();  // Cambié setClases por agregarClase

    // Estados locales para almacenar la información de la nueva clase
    const [NombreClase, setNombreClase] = useState('');
    const [Seccion, setSeccion] = useState('');
    const [Aula, setAula] = useState('');
    const [NRC, setNRC] = useState('');
    const [codigo, setcodigo] = useState('');
    const [registroCompleto, setRegistroCompleto] = useState(false);

    //Función para manejar el boton de "Cancelar"
    const handlePress = () => {
      navigation.navigate('Inicio');
    };
    
    const handleRegistroMateria = () => {
      const nuevaClase = {NRC, NombreClase, Seccion, Aula};
      handleAltaClase(nuevaClase);
      handleAltaRelacion(codigo,NRC);
      agregarClase(nuevaClase);  // Cambié setClases por agregarClase
      console.log('\nNombre de la Clase: ${NombreClase}"\nSeccion: ${Seccion}\nAula: ${Aula}\nNRC: ${NRC}\n');
      navigation.navigate('Inicio', {NRC, NombreClase, Seccion, Aula});
    };
    // Función para verificar si todos los campos estan completos
    const verificarRegistroCompleto = () => {
      if (NombreClase && Seccion && Aula && NRC) {
        setRegistroCompleto(true);
      } else {
        setRegistroCompleto(false);
      }
    };

    // Efecto secundario para verificar el registro completo cuando cambian los valores.
    useEffect(() => {
      verificarRegistroCompleto();
    }, [NombreClase, Seccion, Aula, NRC]);

    // Renderiza la interfaz de usuario
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={require("../../img/x.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
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

          <Text style={styles.title}>Confirma tu codigo</Text>
          <TextInput
            style={styles.formulario}
            placeholder="Codigo"
            value={codigo}
            onChangeText={setcodigo}
          />

          <Button title="Crear" onPress={handleRegistroMateria} color='#3D2788' disabled={!registroCompleto} />
        </View>
      </View>
    );
};

// Estilos asociados al componente.
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#D4BDFA',
    },
    title: {
      fontSize: 30,
      color: 'black',
      marginBottom: 20,
      fontWeight: 'bold',
    },
    image: {
      height: '30%',
      aspectRatio: 1,
      marginBottom: 20,
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
      left: 20,
      marginVertical: '30%',
    },
    header: {
      width: '111%',
      height: '8%',
      left: -20,
      marginVertical: '5%',
    },
    image: {
      width: 30,
      height: 30,
      left: 20,
      marginVertical: 2,
    },
});

// Exporta el componente para su uso en otras partes de la aplicación
export default CrearClase;