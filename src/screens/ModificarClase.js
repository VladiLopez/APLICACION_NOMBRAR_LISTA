import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity } from "react-native";
import { useClases } from "./ClasesContext";

import{modificarClase} from "../backend/modificarClase";

/**
 * Componente funcional ModificarClase.
 * 
 * @description Este componente permite modificar los detalles de una clase específica.
 * Se obtiene la información de la clase a través de los parámetros de ruta.
 * Al guardar los cambios, actualiza el estado de clases y navega de nuevo a la pantalla de inicio.
 * 
 * @param {object} route - Objeto que contiene información sobre la ruta/navegación.
 * @param {object} navigation - Objeto que proporciona funciones de navegación.
 * @returns {JSX.Element} Elemento JSX que renderiza la interfaz de usuario para modificar una clase.
 */
const ModificarClase = ({ route, navigation }) => {
  const { clases, setClases } = useClases();
  const { nrc } = route.params;

  // Estados para los detalles de la clase
  const [NombreClase, setNombreClase] = useState('');
  const [Seccion, setSeccion] = useState('');
  const [Aula, setAula] = useState('');
  const [NRC, setNRC] = useState();


  // Obtener la clase seleccionada usando su ID
  const selectedClass = clases.find(clase => clase.NRC === nrc);
  // Actualizar los estados con los detalles de la clase seleccionada
  useEffect(() => {
    if (selectedClass) {
      setNombreClase(selectedClass.NombreClase);
      setSeccion(selectedClass.Seccion);
      setAula(selectedClass.Aula);
      setNRC(selectedClass.NRC);
    }
  }, [selectedClass]);

  /**
   * Maneja el evento de modificar la clase.
   * Actualiza el estado de clases con los nuevos detalles de la clase modificada.
   * Navega de nuevo a la pantalla de inicio.
   */
  const handleModificarClase = async () => {
    if(selectedClass){
      const nuevaClase = {NombreClase, Seccion, Aula, NRC};
      await modificarClase(NRC, nuevaClase);
      navigation.navigate('Inicio');
    }
  };

  // Renderiza la interfaz de usuario
  return (
    <ImageBackground
        source={require('../../img/background_crearLista.jpg')}
        style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Modificar Clase</Text>
        <TextInput
          style={styles.input}
          value={NombreClase}
          onChangeText={setNombreClase}
          placeholder="Nombre de la Clase"
        />
        <TextInput
          style={styles.input}
          value={Seccion}
          onChangeText={setSeccion}
          placeholder="Sección"
        />
        <TextInput
          style={styles.input}
          value={Aula}
          onChangeText={setAula}
          placeholder="Aula"
        />
        <TextInput
          style={styles.input}
          value={NRC}
          onChangeText={setNRC}
          placeholder="NRC"
        />
        <TouchableOpacity style={styles.customButton} onPress={handleModificarClase}>
          <Text style={styles.customButtonText}>Guardar</Text>
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
  input: {
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
});

// Exportamos el componente para ser usado en otra parte de la publicación
export default ModificarClase;