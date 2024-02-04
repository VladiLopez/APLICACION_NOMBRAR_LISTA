// Importamos modulos y librerías necesarias

import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

/**
 * Componente funcional EditarPerfil.
 * 
 * @description Este componente representa la pantalla de edición de perfil de usuario.
 * Permite al usuario editar su nombre, apellidos, código y contraseña.
 * 
 * @returns {JSX.Element} Elemento JSX que renderiza la pantalla de edición de perfil.
 */
const EditarPerfil = () => {

  // Estados locales para almacenar la información del perfil
  const [Nombre, setNombre] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [codigo, setcodigo] = useState('');
  const [password, setpassword] = useState('');

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
        value={codigo}
        onChangeText={setcodigo}
        placeholder="Codigo"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setpassword}
        placeholder="Password"
      />
      <Button title="Guardar" onPress={"Datos guardados"} color='#3D2788'/>
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