import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg';

const ListadoProfesor = () => {
  // Obtiene la fecha y hora actual en la Ciudad de México
  const fechaHoraActual = new Date();
  const opcionesFechaHora = { timeZone: 'America/Mexico_City' }; // Especifica la zona horaria aquí
  const formattedFechaHora = fechaHoraActual.toLocaleString('es-MX', opcionesFechaHora);

  nombre = 'Gonzalez Monje Ivan Jared';
  codigo = 215698763;

  // Datos que deseas codificar en el QR como un objeto
  const qrData = {
    nombre: 'Gonzalez Monje Ivan Jared',
    codigo: 215698763,
    fechaHoraEscaneo: formattedFechaHora,
  };

  // Convierte el objeto a una cadena JSON
  const qrDataString = JSON.stringify(qrData);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D4BDFA' }}>
      {/* Renderiza el código QR con la cadena JSON como valor */}
      <QRCode
        value={qrDataString}
        size={200} // Tamaño del código QR
        color="black" // Color del código QR
      />
      <Text style={styles.datos}>{nombre}</Text>
      <Text style={styles.datos}>{codigo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  datos: {
    fontSize: 25,
    color: 'black',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ListadoProfesor;
