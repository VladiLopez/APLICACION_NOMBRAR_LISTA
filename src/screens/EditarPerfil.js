import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

const EditarPerfil = () => {

  const [Nombre, setNombre] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [codigo, setcodigo] = useState('');
  const [password, setpassword] = useState('');

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

export default EditarPerfil;
