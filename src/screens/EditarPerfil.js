import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground} from "react-native";
import { Updates } from 'expo';

const EditarPerfil = () => {
  const [Nombre, setNombre] = useState('');
  const [Apellidos, setApellidos] = useState('');
  const [codigo, setcodigo] = useState('');
  const [password, setpassword] = useState('');

  const handleGuardar = () => {
    // Aquí guardarías tus datos, por ejemplo, en una base de datos o en el almacenamiento local.

    // Después de guardar los datos, reiniciar la aplicación
    Updates.reloadAsync();
  };

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
        <TouchableOpacity 
          style={styles.customButton}
          onPress={handleGuardar} 
        >
          <Text style={styles.customButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default EditarPerfil;
