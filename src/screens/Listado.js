import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';
import { obtenerDatosUsuarioPorCodigo } from "../backend/getRegistrosClases";

const ListadoProfesor = () => {
  const route = useRoute();
  const codigo = route.params.codigo;

  const [datosUsuario, setDatosUsuario] = useState(null);

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const usuario = await obtenerDatosUsuarioPorCodigo(codigo);
        setDatosUsuario(usuario);
      } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
      }
    };

    cargarDatosUsuario();
  }, [codigo]);

  // Renderiza la interfaz de usuario
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D4BDFA',}}>
      {datosUsuario && (
        <>
          {/* Renderiza el código QR */}
          <QRCode
            value={`${datosUsuario.Nombre} ${datosUsuario.Apellidos} ${datosUsuario.Codigo}`}
            size={200} // Tamaño del código QR
            color="black" // Color del código QR
          />
          {/* Renderiza los datos */}
          <Text style={styles.datos}>
            {`${datosUsuario.Nombre} ${datosUsuario.Apellidos} ${datosUsuario.Codigo}`}
          </Text>
        </>
      )}
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

export default ListadoProfesor;
