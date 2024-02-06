import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useClases } from "./ClasesContext";

const ModificarClase = ({ route, navigation }) => {
  const { clases, setClases } = useClases();
  const { claseId } = route.params;

  const [NombreClase, setNombreClase] = useState('');
  const [Seccion, setSeccion] = useState('');
  const [Aula, setAula] = useState('');
  const [NRC, setNRC] = useState('');

  const selectedClass = clases.find(clase => clase.id === claseId);

  useEffect(() => {
    if (selectedClass) {
      setNombreClase(selectedClass.NombreClase);
      setSeccion(selectedClass.Seccion);
      setAula(selectedClass.Aula);
      setNRC(selectedClass.NRC);
    }
  }, [selectedClass]);

  const handleModificarClase = () => {
    if (selectedClass) {
      const updatedClases = clases.map(clase =>
        clase.id === claseId
          ? { ...clase, NombreClase, Seccion, Aula, NRC }
          : clase
      );
      setClases(updatedClases);
      navigation.navigate('Inicio');
    }
  };

  return (
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
      <Button title="Guardar" onPress={handleModificarClase} color='#3D2788'/>
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

export default ModificarClase;
