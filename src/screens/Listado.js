import React from "react";
//import DrawerNavigation from "../Navigation/DrawerNavigation.js";
import { View, Text } from "react-native";
import QRCode from 'react-native-qrcode-svg';

const Listado = () => {
  // Datos que deseas codificar en el QR
  const qrData = 'Hola, este es un código QR de ejemplo';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Renderiza el código QR */}
      <QRCode
        value={qrData}
        size={200} // Tamaño del código QR
        color="black" // Color del código QR
        backgroundColor="white" // Color del fondo
      />
      <Text>{qrData}</Text>
    </View>
  );
};

// Exportar el componente para que sea utilizado en otras partes de la app
export default Listado;