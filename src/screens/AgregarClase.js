import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";

const AgregarClase = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [Codigo, setCodigo] = useState('');

  const isCodigoValid = Codigo.length === 6;

  const handleUnirse = () => {
    if (isCodigoValid) {
      navigation.push('HomeAlumno'); // Pantalla para el alumno
    } else {
      // Puedes mostrar una alerta o realizar alguna acción si el código no es válido
      Alert.alert('Código inválido');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar una clase</Text>
      <TextInput
        style={styles.formulario}
        placeholder="J5OP46"
        value={Codigo}
        onChangeText={setCodigo}
        maxLength={6} // Limita la longitud máxima a 6 dígitos
      />
      <Button
        title="Unirse"
        onPress={handleUnirse}
        color='#3D2788'
        disabled={!isCodigoValid} // Deshabilita el botón si el código no es válido
      />
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
});

export default AgregarClase;
