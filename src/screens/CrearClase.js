import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useClases } from "./ClasesContext";

const CrearClase = () => {
    const navigation = useNavigation();
    const { agregarClase } = useClases();  // Cambié setClases por agregarClase

    const [NombreClase, setNombreClase] = useState('');
    const [Seccion, setSeccion] = useState('');
    const [Aula, setAula] = useState('');
    const [NRC, setNRC] = useState('');
    const [registroCompleto, setRegistroCompleto] = useState(false);

    const handlePress = () => {
      navigation.navigate('Inicio');
    };

    const handleRegistroMateria = () => {
      const nuevaClase = { NombreClase, Seccion, Aula, NRC };
      agregarClase(nuevaClase);  // Cambié setClases por agregarClase
      console.log(`\nNombre de la Clase: ${NombreClase}\nSeccion: ${Seccion}\nAula: ${Aula}\nNRC: ${NRC}\n`);
      navigation.navigate('Inicio', { NombreClase, Seccion, Aula, NRC });
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
            onChangeText={setNRC}
          />
          <Button title="Crear" onPress={handleRegistroMateria} color='#3D2788' disabled={!registroCompleto} />
        </View>
      </View>
    );
};

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

export default CrearClase;
