// Importamos modulos y librerías necesarias
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
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

  const obtenerDatosUsuario = async () => {
    try {
      if (!codigoProfesor && !codigoLocal) {
        return;
      }

      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('Codigo', codigoProfesor || codigoLocal); // Usa el código local si está presente

      if (error) {
        console.error('Error al obtener los datos del usuario:', error);
        return;
      }

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

  const handleGuardarCambios = async () => {
    try {
      const codigoParaActualizar = codigoProfesor || codigoLocal; // Usa el código local si está presente
      if (!codigoParaActualizar) {
        console.error('Código de profesor no proporcionado.');
        return;
      }

      const { data, error } = await supabase
        .from('usuarios')
        .update({ Nombre: Nombre, Apellidos: Apellidos, Codigo: Codigo, password: password })
        .eq('Codigo', codigoParaActualizar);

      if (error) {
        console.error('Error al actualizar el perfil:', error);
        return;
      }

      console.log('Perfil actualizado exitosamente.');
      obtenerDatosUsuario();

      // Regresa a la ventana anterior
      navigation.goBack();
    } catch (error) {
      console.error('Error general al interactuar con Supabase:', error);
    }
  };

  // Renderiza la interfaz de usuario
  return (
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
      <Button title="Guardar" onPress={handleGuardarCambios} color='#3D2788'/>
    </View>
  );
};

// Estilos asociados al componente
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
});

// Exporta el componente para su uso en otras partes de la aplicación.
export default EditarPerfil;