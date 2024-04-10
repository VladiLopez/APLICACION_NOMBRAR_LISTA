/**
 * Componente para generar un listado de profesor.
 * 
 * Este componente genera un listado con el código QR del profesor y sus datos asociados,
 * incluyendo nombre, código y NRC de la clase. Utilizando la librería react-native-qrcode-svg
 * para generar el código QR a partir del código del profesor y el NRC de la clase.
 * Los datos del profesor se obtienen mediante una llamada a la función obtenerDatosUsuarioPorCódigocdel backend
 */
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground} from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';
import { obtenerDatosUsuarioPorCodigo } from "../backend/getRegistrosClases";

const ListadoProfesor = () => {
  // Obtiene los parámetros de la ruta
  const route = useRoute();
  const codigo = route.params.codigo;
  const nrc = route.params.nrc;

  // Estado para lamacenar los datos del usuario y el NRC de la clase
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [nrcClase, setNrcClase] = useState(null);

  // Cargar los datos del usuario al montar el componente
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

    // Se ejecuta cuando el código del usuario cambia
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

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación mediante la importación de los modulos
export default ListadoProfesor;
