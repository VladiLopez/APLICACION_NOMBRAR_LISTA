//import DrawerNavigation from "../Navigation/DrawerNavigation.js";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';

const ListadoProfesor = () => {
  // Datos que deseas codificar en el QR
  const qrData = 'Gonzalez Monje Ivan Jared\n215698763';

  // Renderiza la interfaz de usuario
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D4BDFA',}}>
      {/* Renderiza el código QR */}
      <QRCode
        value={qrData}
        size={200} // Tamaño del código QR
        color="black" // Color del código QR
      />
      <Text style={styles.datos}>{qrData}</Text>
    </View>
  );
};

// Estilos asociados al componente
const styles = StyleSheet.create({
  datos: {
    fontSize: 25,
    color: 'black',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// Exportamos el componente para ser usado en otra parte de la aplicación
export default ListadoProfesor;