import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground} from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';
import { obtenerDatosUsuarioPorCodigo } from "../backend/getRegistrosClases";

const ListadoProfesor = () => {
  const route = useRoute();
  const codigo = route.params.codigo;
  const nrc = route.params.nrc;

  const [datosUsuario, setDatosUsuario] = useState(null);
  const [nrcClase, setNrcClase] = useState(null);

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const usuario = await obtenerDatosUsuarioPorCodigo(codigo);
        setDatosUsuario(usuario);
        setNrcClase(nrc); // Asumiendo que el NRC está en el objeto de usuario
      } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
      }
    };

    cargarDatosUsuario();
  }, [codigo]);

  // Renderiza la interfaz de usuario
  return (
    <ImageBackground
        source={require('../../img/background_crearLista.jpg')}
        style={styles.backgroundImage}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',}}>
        {datosUsuario && (
          <>
            {/* Renderiza el código QR */}
            <QRCode
              value={`${datosUsuario.Codigo}-${nrcClase}`}
              size={200} // Tamaño del código QR
              color="black" // Color del código QR
            />
            {/* Renderiza los datos */}
            <Text style={styles.datos}>
              {`${datosUsuario.Nombre} ${datosUsuario.Apellidos}`}
            </Text>
            <Text style={styles.datos}>
              {`${datosUsuario.Codigo}`}
            </Text>
            <Text style={styles.datos}>
              {`NRC: ${nrcClase}`}
            </Text>
          </>
        )}
      </View>
    </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default ListadoProfesor;
