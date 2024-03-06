// Importamos los modulos y las librerías necesarias
import React, { useEffect, useState } from 'react';
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity, Button, StyleSheet, Text, View, ImageBackground, Alert} from 'react-native';
import { Camera } from 'expo-camera';
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
  const [text, setText] = useState('');

   const route = useRoute();

   const nrcqr = route.params.nrc;

  /**
   * Función asincrónica para solicitar permisos de la cámara.
   * @function
   */
  const askForCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // Función para registrar la hora de llegada en Supabase
  const registrarLlegada = async (codigoQR) => {
    try {
      const [codigoAlumno, nrcClase] = codigoQR.split('-'); 

      if(nrcClase == nrcqr){
        await registrarHoraLlegada(codigoAlumno, nrcClase);
      }else{
        Alert.alert("Alerta", "Estas registrando un QR de una clase distinta");
      }
    } catch (error) {
     
    }
  };

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    registrarLlegada(data);
    console.log('Tipo: ' + type + '\nDato: ' + data);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Se requiere el permiso de cámara</Text>
      </View>
    );
  }

  // is not allow ???
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No se tiene acceso a la cámara</Text>
        <Button title={'Permiso de cámara'} onPress={() => askForCameraPermission()} />
      </View>
    );
  }

  // Return the View
  return (
    <ImageBackground
      source={require('../../img/background_crearLista.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.barcodebox}>
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} 
            type={Camera.Constants.Type.back}
          />
        </View>
        <Text style={styles.maintext}>{text}</Text>

        {scanned && (
          <TouchableOpacity onPress={() => setScanned(false)} style={styles.customButton}>
            <Text style={styles.customButtonText}>¿Escanear nuevamente?</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

// Estilos asociados al componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  customButton: {
    width: '55%',
    height: 35,
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
