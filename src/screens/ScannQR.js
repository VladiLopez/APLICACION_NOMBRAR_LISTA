// Importamos los modulos y las librerías necesarias
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { registrarHoraLlegada } from '../backend/altaHora';

/**
 * Componente funcional para escanear códigos QR.
 * @returns {JSX.Element}
 */
export default function ScannQR() {
  // Estado para rastrear si el código QR ha sido escaneado
  const [scanned, setScanned] = useState(false);

  // Estado para almacenar el texto scanneado del codigo QR
  const [codigoQR, setCodigoQR] = useState('');

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
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setCodigoQR(data);
    registrarLlegada(data);
    console.log('Código QR escaneado:', data);
  };

  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{codigoQR}</Text>

      {scanned && <Button title={'Escanear nuevamente?'} onPress={() => setScanned(false)} color='#3D2788' />}
    </View>
  );
}

// Estilos asociados al componente 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4BDFA',
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
  }
});