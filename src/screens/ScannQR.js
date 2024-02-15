// Importamos los modulos y las librerías necesarias

import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, ImageBackground} from 'react-native';
import { registrarHoraLlegada } from '../backend/altaHora';


/**
 * Componente funcional para escanear códigos QR.
 * @returns {JSX.Element}
 */
export default function ScannQR() {
  // Estado para almacenar la información sobre los permisos de la cámara
  const [hasPermission, setHasPermission] = useState(null);
  // Estado para rastrear si el código QR ha sido escaneado
  const [scanned, setScanned] = useState(false);
  // Estado para almacenar el texto scanneado del codigo QR
  const [text, setText] = useState('')
  // Estado para almacenar el texto scanneado del código QR

  /**
   * Función asincrónica para solicitar permisos de la cámara.
   * @function
   */
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // Función para registrar la hora de llegada en Supabase
  const registrarLlegada = async (codigoQR) => {
    try {
      const [codigoAlumno, nrcClase] = codigoQR.split('-'); // Suponiendo que has usado '-' como separador
      await registrarHoraLlegada(codigoAlumno, nrcClase);
      console.log('Hora de llegada registrada correctamente');
    } catch (error) {
      console.error('Error al registrar la hora de llegada:', error);
    }
  };

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    registrarLlegada(data);
    console.log('Tipo: ' + type + '\nDato: ' + data)
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Se requiere el permiso de camara</Text>
      </View>)
  }

  // is not allow ???
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No se tiene acceso a la camara</Text>
        <Button title={'Permiso de camara'} onPress={() => askForCameraPermission()} />
      </View>)
  }

  // Return the View
  return (
    <ImageBackground
        source={require('../../img/background_crearLista.jpg')}
        style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        <Text style={styles.maintext}>{text}</Text>

        {scanned && <Button title={'Escanear nuevamente?'} onPress={() => setScanned(false)} color='#3D2788' />}
      </View>
    </ImageBackground>
  );
}

// Estilos asociados al componente 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#D4BDFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: '#D3D7DB'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});