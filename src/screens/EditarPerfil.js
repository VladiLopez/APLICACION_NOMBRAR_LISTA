// Importamos modulos y librerías necesarias para desplegar los elementos visuales
import React, { useState, useEffect } from "react";
import { TouchableOpacity,Button, StyleSheet, Text, TextInput, View, ImageBackground} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useClases } from "../screens/ClasesContext";
import { supabase } from "../../Lib/supabase";


/**
 * Componente funcional EditarPerfil.
 * 
 * @description Este componente representa la pantalla de edición de perfil de usuario.
 * Permite al usuario editar su nombre, apellidos, código y contraseña.
 * 
 * @returns {JSX.Element} Elemento JSX que renderiza la pantalla de edición de perfil.
 */
const EditarPerfil = () => {
  const { codigoProfesor } = useClases();
  const navigation = useNavigation();

  // Estados locales para almacenar la información del perfil
  const [Nombre, setNombre] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [Codigo, setCodigo] = useState('');
  const [password, setPassword] = useState('');
  const [codigoLocal, setCodigoLocal] = useState(''); // Nuevo estado local para almacenar el código

  /**
   * Función asincronica para obtener los datos del usuario.
   * 
   * Esta función se encarga de obtener los datos del usuario, ya que un profesor o un usuario local,
   * a partir de los códigos de profesor ('codigoProfesor') y local ('codigoLocal'). Verifica si ambos
   * códigos están presentes, y si no lo están, retorna temprano sin realizar ninguna acción.
   */
  const obtenerDatosUsuario = async () => {
    try {
      // Verificar si no hay  código de profesor ni local, y retorna temprano si es así
      if (!codigoProfesor && !codigoLocal) {
        return;
      }

      // Obtener los datos del usuario utilizando el código de profesor o local, según sea necesario
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('Codigo', codigoProfesor || codigoLocal); // Usa el código local si está presente

      // Agregamos un sistema de validación de errores para agregarle tolerancia a fallos
      if (error) {
        console.error('Error al obtener los datos del usuario:', error);
        return;
      }

      // Se obtienen datos del usuario, actualizar los estados correspondientes con los datos obtenidos
      if (data && data.length > 0) {
        const usuario = data[0];
        setNombre(usuario.Nombre);
        setApellidos(usuario.Apellidos);
        setCodigo(usuario.Codigo);
        setPassword(usuario.password);
      }
    } catch (error) {
      console.error('Error general al interactuar con Supabase:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() =>{ 
      obtenerDatosUsuario();
    }, [])
  );

  /**
   * Función asincrónica para guardar los cambios realizados en el perfil del usuario.
   * 
   * Esta funcion se encarga de guardar los cambios realizados en el perfil del usuario.
   * Utiliza el código local si está presente para identificar al usuario.
   * Si no se proporciona un código de usuario, registra un error en la consola y retorna temprano.
   * Si ocurre un error al actualizar el perfil en la base de datos, se manera y registra en la consola.
   * Si la actualización se realiza exitosamente, registra un mensaje de éxito en la consola y navega de vuelta.
   */
  const handleGuardarCambios = async () => {
    try {
      // Utilizar el código de profesor o local para identificar al usuario, según esté presente
      const codigoParaActualizar = codigoProfesor || codigoLocal; // Usa el código local si está presente
      if (!codigoParaActualizar) {
        console.error('Código de profesor no proporcionado.');
        return;
      }

      // Actualizar el perfil del usuario en la base de datos con los datos proporcionados
      const { data, error } = await supabase
        .from('usuarios')
        .update({ Nombre: Nombre, Apellidos: Apellidos, Codigo: Codigo, password: password })
        .eq('Codigo', codigoParaActualizar);

      // Manejar el error si ocurre al actualizar el perfil
      if (error) {
        console.error('Error al actualizar el perfil:', error);
        return;
      }

      // Si la actualización se realiza exitosamente, registrar un mensaje de éxito en la consola y navegar de vuelta
      console.log('Perfil actualizado exitosamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error general al interactuar con Supabase:', error);
    }
  };

  // Renderiza la interfaz de usuario
  return (
    <ImageBackground
        source={require('../../img/background_crearLista.jpg')}
        style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Editar perfil</Text>
        <TextInput
          style={styles.input}
          value={Nombre}
          onChangeText={setNombre}
          placeholder="Nombre"
        />
        <TextInput
          style={styles.input}
          value={Apellidos}
          onChangeText={setApellidos}
          placeholder="Apellidos"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />
        <TouchableOpacity 
            style={[styles.customButton]} 
            onPress={handleGuardarCambios} 
          >
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
    width: '30%',
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

// Exporta el componente para su uso en otras partes de la aplicación.
export default EditarPerfil;